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
  }
};

module.exports = UserModel;
