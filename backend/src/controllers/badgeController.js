const badgeService = require('../services/badgeService');

exports.getAllBadges = (req, res) => {
  badgeService.getAllBadges()
    .then(badges => res.json({ data: badges }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createBadge = (req, res) => {
  const { name, type, target } = req.body;
  if (!name || !type || !target) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  badgeService.createBadge(req.body)
    .then(badge => res.json({ data: badge }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.getUserProgress = (req, res) => {
  badgeService.checkUserProgress(req.params.userId)
    .then(progress => res.json({ data: progress }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.getUserBadges = (req, res) => {
  badgeService.getEarnedBadges(req.params.userId)
    .then(badges => res.json({ data: badges }))
    .catch(err => res.status(500).json({ error: err.message }));
};