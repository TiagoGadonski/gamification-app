// backend/src/models/noteModel.js
const db = require('../utils/db');

const NoteModel = {
  create: (noteData, callback) => {
    const sql = `
      INSERT INTO notes (user_id, title, content)
      VALUES (?, ?, ?)
    `;
    const params = [noteData.user_id, noteData.title, noteData.content];
    db.run(sql, params, function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, ...noteData });
    });
  },

  findAll: (callback) => {
    const sql = `SELECT * FROM notes ORDER BY created_at DESC`;
    db.all(sql, [], (err, rows) => {
      callback(err, rows);
    });
  }
};

module.exports = NoteModel;
