// backend/src/routes/financeRoutes.js
const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.get('/', financeController.getAllFinances);
router.post('/', financeController.createFinance);

module.exports = router;
