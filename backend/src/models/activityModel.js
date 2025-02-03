const db = require('../utils/db');

const ActivityModel = {
  create: (activityData, callback) => {
    const sql = `
      INSERT INTO activities (
        title, 
        description, 
        points,
        difficulty,
        category,
        user_id,
        streak_id,
        due_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [
      activityData.title,
      activityData.description,
      activityData.points,
      activityData.difficulty || 'medium',
      activityData.category || 'geral',
      activityData.user_id,
      activityData.streak_id || null,
      activityData.due_date || null
    ];

    db.run(sql, params, function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...activityData });
    });
  },

  completeActivity: (activityId, callback) => {
    const sql = `
      UPDATE activities
      SET 
        is_completed = TRUE,
        completion_date = CURRENT_TIMESTAMP,
        xp_earned = points * (
          CASE difficulty
            WHEN 'hard' THEN 1.5
            WHEN 'medium' THEN 1.2
            ELSE 1
          END
        )
      WHERE id = ?`;
    
    db.run(sql, [activityId], function(err) {
      if (err) return callback(err);
      callback(null, this.changes);
    });
  },
  findAll: (callback) => { // Deve existir este método
    const sql = `SELECT * FROM activities ORDER BY created_at DESC`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  },

  findAllByUser: (userId, callback) => {
    const sql = `
      SELECT *, 
        (julianday('now') - julianday(completion_date)) as days_since_completion
      FROM activities
      WHERE user_id = ?
      ORDER BY created_at DESC`;
    
    db.all(sql, [userId], callback);
  },

  findStreakActivities: (streakId, callback) => {
    const sql = `
      SELECT * FROM activities
      WHERE streak_id = ?
      ORDER BY created_at ASC`;
    
    db.all(sql, [streakId], callback);
  }
};

module.exports = ActivityModel;