// backend/src/controllers/activityController.js
const activityService = require('../services/activityService');

exports.getAllActivities = (req, res) => {
  activityService.getAllActivities()
    .then(activities => res.json({ data: activities }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createActivity = (req, res) => {
  const { title, description, points, user_id } = req.body;
  if (!title || points === undefined || !user_id) {
    return res.status(400).json({ error: "title, points e user_id são obrigatórios." });
  }

  activityService.createActivity({ title, description, points, user_id })
    .then(activity => res.json({ data: activity }))
    .catch(err => res.status(500).json({ error: err.message }));
};
