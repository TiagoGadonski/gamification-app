// backend/src/routes/badgeRoutes.js
const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');

router.get('/', badgeController.getAllBadges);
router.post('/', badgeController.createBadge);

module.exports = router;
