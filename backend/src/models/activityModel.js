// backend/src/models/activityModel.js
const db = require('../utils/db');

const ActivityModel = {
  create: (activityData, callback) => {
    const sql = `
      INSERT INTO activities (title, description, points, user_id)
      VALUES (?, ?, ?, ?)
    `;
    const params = [
      activityData.title,
      activityData.description,
      activityData.points,
      activityData.user_id
    ];
    db.run(sql, params, function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...activityData });
    });
  },

  findAll: (callback) => {
    const sql = `SELECT * FROM activities ORDER BY created_at DESC`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }
};

module.exports = ActivityModel;
