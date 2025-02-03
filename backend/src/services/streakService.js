const db = require('../utils/db');

const streakService = {
  createStreak: (userId, title) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO streaks (user_id, title, current_count) 
         VALUES (?, ?, 0)`,
        [userId, title],
        function(err) {
          err ? reject(err) : resolve(this.lastID);
        }
      );
    });
  },

  updateStreakProgress: (streakId) => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        // Verifica última atividade do streak
        db.get(
          `SELECT completion_date 
           FROM activities 
           WHERE streak_id = ? 
           ORDER BY completion_date DESC 
           LIMIT 1`,
          [streakId],
          (err, lastActivity) => {
            if (err) return reject(err);

            const now = new Date();
            const lastDate = new Date(lastActivity.completion_date);
            const dayDiff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

            if (dayDiff === 1) { // Streak mantido
              db.run(
                `UPDATE streaks 
                 SET current_count = current_count + 1,
                     longest_streak = MAX(longest_streak, current_count + 1)
                 WHERE id = ?`,
                [streakId],
                function(err) {
                  err ? reject(err) : resolve(this.changes);
                }
              );
            } else { // Streak quebrado
              db.run(
                `UPDATE streaks SET current_count = 0 WHERE id = ?`,
                [streakId],
                function(err) {
                  err ? reject(err) : resolve(this.changes);
                }
              );
            }
          }
        );
      });
    });
  }
};

module.exports = streakService;