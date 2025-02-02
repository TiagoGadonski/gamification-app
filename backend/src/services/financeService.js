// backend/src/services/financeService.js
const FinanceModel = require('../models/financeModel');
const userService = require('./userService');

const financeService = {
  createFinance: (financeData) => {
    return new Promise((resolve, reject) => {
      FinanceModel.create(financeData, async (err, newFinance) => {
        if (err) return reject(err);

        // Defina a lógica de pontuação financeira
        let points = 0;
        // Exemplo: se for "entrada", +value pontos; se for "saída", -value pontos
        if (financeData.type === 'entrada') {
          points = financeData.value;
        } else if (financeData.type === 'saída') {
          points = -financeData.value;
        }

        try {
          await userService.addPointsAndLevel(financeData.user_id, points);
        } catch (err2) {
          return reject(err2);
        }

        resolve(newFinance);
      });
    });
  },

  getAllFinances: () => {
    return new Promise((resolve, reject) => {
      FinanceModel.findAll((err, finances) => {
        if (err) return reject(err);
        resolve(finances);
      });
    });
  }
};

module.exports = financeService;
