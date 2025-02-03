const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const authMiddleware = require('../middleware/auth');

router.get('/', badgeController.getAllBadges);
router.post('/', authMiddleware, badgeController.createBadge);
router.get('/:userId/progress', authMiddleware, badgeController.getUserProgress);
router.get('/:userId/earned', authMiddleware, badgeController.getUserBadges);

module.exports = router;