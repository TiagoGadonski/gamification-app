// backend/src/models/badgeModel.js
const db = require('../utils/db');

const BadgeModel = {
  // Exemplo de criação de badge
  create: (badgeData, callback) => {
    const sql = `INSERT INTO badges (name, description, image, criteria) VALUES (?, ?, ?, ?)`;
    const params = [badgeData.name, badgeData.description, badgeData.image, badgeData.criteria];
    db.run(sql, params, function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...badgeData });
    });
  },

  // Exemplo de busca de todas as badges
  findAll: (callback) => {
    const sql = `SELECT * FROM badges`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  },

  findByType: (type, callback) => {
    db.all(
      'SELECT * FROM badges WHERE type = ?',
      [type],
      callback
    );
  },

  findAchievable: (callback) => {
    db.all(
      `SELECT * FROM badges 
       WHERE (repeatable = TRUE OR id NOT IN (
         SELECT badge_id FROM user_badges WHERE unlocked = TRUE
       ))`,
      callback
    );
  }
};

module.exports = BadgeModel;
