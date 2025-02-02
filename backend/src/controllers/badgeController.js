// backend/src/controllers/badgeController.js
const badgeService = require('../services/badgeService');

exports.getAllBadges = (req, res) => {
  badgeService.getAllBadges()
    .then(badges => res.json({ data: badges }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createBadge = (req, res) => {
  const { name, description, image, criteria } = req.body;
  if (!name) {
    return res.status(400).json({ error: "name é obrigatório." });
  }

  badgeService.createBadge({ name, description, image, criteria })
    .then(badge => res.json({ data: badge }))
    .catch(err => res.status(500).json({ error: err.message }));
};
