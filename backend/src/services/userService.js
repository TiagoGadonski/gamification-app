// backend/src/services/userService.js
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

const SALT_ROUNDS = 10;

const userService = {
  registerUser: (userData) => {
    return new Promise((resolve, reject) => {
      // Criptografa a senha
      bcrypt.hash(userData.password, SALT_ROUNDS, (err, hash) => {
        if (err) return reject(err);

        // Substitui a senha em texto puro pelo hash
        userData.password = hash;

        // Salva no banco
        UserModel.create(userData, (err, newUser) => {
          if (err) return reject(err);
          // Remover a senha do objeto antes de retornar
          delete newUser.password;
          resolve(newUser);
        });
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      UserModel.findById(id, (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      UserModel.findByEmail(email, (err, user) => {
        if (err) return reject(err);
        resolve(user);
      });
    });
  },

  updateUser: (id, updateData) => {
    return new Promise((resolve, reject) => {
      // Caso precise hashear a senha novamente, ou outras validações, faça aqui
      UserModel.update(id, updateData, (err, updatedUser) => {
        if (err) return reject(err);

        // Se o objeto retornar contiver a senha, remove-a (boas práticas)
        // No nosso caso, estamos buscando apenas id, name, email, avatar, level e points, 
        // então não deve conter password. Mas em caso de uso, removeríamos:
        // if (updatedUser.password) delete updatedUser.password;

        resolve(updatedUser);
      });
    });
  },
  completeActivity: async (userId, activityId) => {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT points FROM activities WHERE id = ?`,
        [activityId],
        async (err, activity) => {
          if (err) return reject(err);
          
          // Atualiza pontos e nível
          UserModel.updatePointsAndLevel(userId, activity.points, async (err, result) => {
            if (err) return reject(err);
            
            // Verifica conquistas
            const badges = await BadgeService.checkNewBadges(userId);
            
            resolve({
              points: result.currentPoints,
              level: result.newLevel,
              badges
            });
          });
        }
      );
    });
  },

  customizeProfile: (userId, customization) => {
    return new Promise((resolve, reject) => {
      UserModel.updateCustomization(userId, customization, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  }
};

module.exports = userService;
