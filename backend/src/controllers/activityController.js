const activityService = require('../services/activityService');

exports.getAllActivities = (req, res) => {
  activityService.getAllActivities() // Agora deve funcionar
    .then(activities => res.json({ data: activities }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createActivity = (req, res) => {
  const { title, user_id } = req.body;
  if (!title || !user_id) {
    return res.status(400).json({ error: "Título e ID do usuário são obrigatórios." });
  }

  activityService.createActivity(req.body)
    .then(activity => res.json({ data: activity }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.completeActivity = (req, res) => {
  activityService.completeActivity(req.params.id)
    .then(result => res.json({ data: result }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.getWeeklyStats = (req, res) => {
  activityService.getWeeklySummary(req.params.userId)
    .then(stats => res.json({ data: stats }))
    .catch(err => res.status(500).json({ error: err.message }));
};