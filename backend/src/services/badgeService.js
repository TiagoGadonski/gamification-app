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
  }
};

module.exports = badgeService;
