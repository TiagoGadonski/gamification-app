// backend/src/services/activityService.js
const ActivityModel = require('../models/activityModel');
const userService = require('./userService');

const activityService = {
  createActivity: (activityData) => {
    return new Promise((resolve, reject) => {
      ActivityModel.create(activityData, async (err, newActivity) => {
        if (err) return reject(err);

        // Atualiza pontos do usuário
        try {
          await userService.addPointsAndLevel(activityData.user_id, activityData.points);
        } catch (err2) {
          return reject(err2);
        }

        resolve(newActivity);
      });
    });
  },

  getAllActivities: () => {
    return new Promise((resolve, reject) => {
      ActivityModel.findAll((err, activities) => {
        if (err) return reject(err);
        resolve(activities);
      });
    });
  }
};

module.exports = activityService;
