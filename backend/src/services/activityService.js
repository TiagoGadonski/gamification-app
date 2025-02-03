const ActivityModel = require('../models/activityModel');
const userService = require('./userService');
const streakService = require('./streakService');
const badgeService = require('./badgeService');

const XP_MULTIPLIER = {
  easy: 1,
  medium: 1.2,
  hard: 1.5
};

const activityService = {
  createActivity: (activityData) => {
    return new Promise((resolve, reject) => {
      ActivityModel.create(activityData, async (err, newActivity) => {
        if (err) return reject(err);
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
  },

  completeActivity: async (activityId) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Marca atividade como completa
        await new Promise((res, rej) => {
          ActivityModel.completeActivity(activityId, (err) => 
            err ? rej(err) : res());
        });

        // Busca dados da atividade
        const activity = await activityService.getActivityById(activityId);
        
        // Calcula XP com multiplicador
        const xp = Math.floor(activity.points * XP_MULTIPLIER[activity.difficulty]);
        
        // Atualiza usuário
        const userUpdate = await userService.addPointsAndLevel(
          activity.user_id, 
          xp
        );

        // Atualiza streak
        const streakUpdate = await streakService.updateStreakProgress(
          activity.streak_id
        );

        // Verifica conquistas
        const badges = await badgeService.checkActivityBadges(activity.user_id);

        resolve({
          activity: { ...activity, xp_earned: xp },
          user: userUpdate,
          streak: streakUpdate,
          badges
        });
      } catch (err) {
        reject(err);
      }
    });
  },

  getActivityById: (activityId) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM activities WHERE id = ?',
        [activityId],
        (err, row) => err ? reject(err) : resolve(row)
      );
    });
  },

  getWeeklySummary: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT 
          strftime('%w', completion_date) as weekday,
          COUNT(*) as count,
          SUM(xp_earned) as total_xp
        FROM activities
        WHERE user_id = ?
          AND completion_date >= date('now', '-7 days')
        GROUP BY weekday
      `, [userId], (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
};

module.exports = activityService;