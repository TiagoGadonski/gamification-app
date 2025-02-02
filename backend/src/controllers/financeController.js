// backend/src/controllers/financeController.js
const financeService = require('../services/financeService');

exports.getAllFinances = (req, res) => {
  financeService.getAllFinances()
    .then(finances => res.json({ data: finances }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.createFinance = (req, res) => {
  const { user_id, type, value, description } = req.body;
  if (!user_id || !type || value === undefined) {
    return res.status(400).json({ error: "user_id, type e value são obrigatórios." });
  }

  financeService.createFinance({ user_id, type, value, description })
    .then(finance => res.json({ data: finance }))
    .catch(err => res.status(500).json({ error: err.message }));
};
