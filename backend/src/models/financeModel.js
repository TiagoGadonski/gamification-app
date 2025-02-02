// backend/src/models/financeModel.js
const db = require('../utils/db');

const FinanceModel = {
  create: (financeData, callback) => {
    const sql = `
      INSERT INTO finances (user_id, type, value, description)
      VALUES (?, ?, ?, ?)
    `;
    const params = [
      financeData.user_id,
      financeData.type,
      financeData.value,
      financeData.description
    ];
    db.run(sql, params, function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...financeData });
    });
  },

  findAll: (callback) => {
    const sql = `SELECT * FROM finances ORDER BY date DESC`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }
};

module.exports = FinanceModel;
