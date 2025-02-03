// backend/src/services/badgeService.js
const BadgeModel = require('../models/badgeModel');

const badgeService = {
  createBadge: (badgeData) => {
    return new Promise((resolve, reject) => {
      BadgeModel.create(badgeData, (err, newBadge) => {
        if (err) return reject(err);
        resolve(newBadge);
      });
    });
  },

  getAllBadges: () => {
    return new Promise((resolve, reject) => {
      BadgeModel.findAll((err, badges) => {
        if (err) return reject(err);
        resolve(badges);
      });
    });
  },
  checkUserProgress: (userId) => {
    return new Promise((resolve, reject) => {
      db.serialize(async () => {
        try {
          // Busca dados do usuário
          const user = await new Promise((res, rej) => {
            db.get('SELECT points FROM users WHERE id = ?', [userId], (err, row) => 
              err ? rej(err) : res(row));
          });

          // Busca todas as badges possíveis
          const badges = await new Promise((res, rej) => {
            db.all('SELECT * FROM badges', (err, rows) => 
              err ? rej(err) : res(rows));
          });

          // Verifica progresso para cada badge
          const results = await Promise.all(badges.map(async (badge) => {
            const progress = await badgeService.calculateProgress(userId, badge);
            return { ...badge, ...progress };
          }));

          resolve(results);
        } catch (err) {
          reject(err);
        }
      });
    });
  },

  calculateProgress: (userId, badge) => {
    return new Promise((resolve) => {
      switch (badge.type) {
        case 'points':
          db.get(
            `SELECT points FROM users WHERE id = ?`,
            [userId],
            (err, row) => resolve({
              current: row.points,
              progress: Math.min(row.points / badge.target * 100, 100)
            })
          );
          break;

        case 'activity_count':
          db.get(
            `SELECT COUNT(*) as count FROM activities 
             WHERE user_id = ? AND completed = TRUE`,
            [userId],
            (err, row) => resolve({
              current: row.count,
              progress: Math.min(row.count / badge.target * 100, 100)
            })
          );
          break;

        default:
          resolve({ current: 0, progress: 0 });
      }
    });
  },

  unlockBadge: (userId, badgeId) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO user_badges (user_id, badge_id, unlocked) 
         VALUES (?, ?, TRUE)
         ON CONFLICT(user_id, badge_id) DO UPDATE SET
           unlocked_count = unlocked_count + 1,
           progress = 0`,
        [userId, badgeId],
        function(err) {
          err ? reject(err) : resolve(this.lastID);
        }
      );
    });
  },

  getEarnedBadges: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT b.*, ub.unlocked_count, ub.obtained_at 
         FROM badges b
         JOIN user_badges ub ON b.id = ub.badge_id
         WHERE ub.user_id = ? AND ub.unlocked = TRUE`,
        [userId],
        (err, rows) => err ? reject(err) : resolve(rows)
      );
    });
  }
};

module.exports = badgeService;
