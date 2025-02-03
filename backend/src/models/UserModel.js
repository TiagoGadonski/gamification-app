// backend/src/models/userModel.js
const db = require('../utils/db');

const UserModel = {
  create: (userData, callback) => {
    const sql = `INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)`;
    const params = [userData.name, userData.email, userData.password, userData.avatar];
    db.run(sql, params, function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...userData });
    });
  },

  findByEmail: (email, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
      callback(err, row);
    });
  },

  findById: (id, callback) => {
    const sql = `SELECT id, name, email, avatar, level, points FROM users WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      callback(err, row);
    });
  },

  // Atualizar pontos, nível etc... (já existindo no exemplo anterior)
  updatePointsAndLevel: () => { /* ... */ },

  update: (id, updateData, callback) => {
    // Exemplo: atualiza apenas name e avatar
    const sql = `UPDATE users SET name = ?, avatar = ? WHERE id = ?`;
    const params = [updateData.name, updateData.avatar, id];

    db.run(sql, params, function (err) {
      if (err) return callback(err);

      // Depois de atualizar, buscamos o registro para retornar ao caller
      db.get(
        `SELECT id, name, email, avatar, level, points FROM users WHERE id = ?`,
        [id],
        (err2, row) => {
          if (err2) return callback(err2);
          callback(null, row);
        }
      );
    });
  },

  updatePointsAndLevel: (userId, pointsEarned, callback) => {
    db.serialize(() => {
      // Atualiza os pontos primeiro
      db.run(
        `UPDATE users 
         SET points = points + ?
         WHERE id = ?`,
        [pointsEarned, userId],
        function(err) {
          if (err) return callback(err);

          // Verifica e atualiza o nível
          db.get(
            `SELECT points, level FROM users WHERE id = ?`,
            [userId],
            (err, row) => {
              if (err) return callback(err);
              
              let newLevel = row.level;
              let currentPoints = row.points;

              // Calcula o novo nível (progressão exponencial)
              while (currentPoints >= newLevel * 100) {
                newLevel += 1;
              }

              if (newLevel > row.level) {
                db.run(
                  `UPDATE users SET level = ? WHERE id = ?`,
                  [newLevel, userId],
                  (err) => callback(err, { newLevel, currentPoints })
                );
              } else {
                callback(null, { newLevel: row.level, currentPoints });
              }
            }
          );
        }
      );
    });
  },

  unlockBadge: (userId, badgeId, callback) => {
    db.run(
      `INSERT INTO user_badges (user_id, badge_id) 
       VALUES (?, ?)`,
      [userId, badgeId],
      function(err) {
        callback(err, { badgeId, id: this.lastID });
      }
    );
  },

  updateCustomization: (userId, { theme, colorScheme, avatar }, callback) => {
    db.run(
      `UPDATE users 
       SET theme = ?, color_scheme = ?, avatar = ?
       WHERE id = ?`,
      [theme, colorScheme, avatar, userId],
      function(err) {
        if (err) return callback(err);
        UserModel.findById(userId, callback);
      }
    );
  },

  getBadges: (userId, callback) => {
    db.all(
      `SELECT b.* FROM badges b
       JOIN user_badges ub ON b.id = ub.badge_id
       WHERE ub.user_id = ?`,
      [userId],
      callback
    );
  }
};

module.exports = UserModel;
