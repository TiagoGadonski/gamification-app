const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middleware/auth');

router.get('/', activityController.getAllActivities);
router.post('/', authMiddleware, activityController.createActivity);
router.post('/:id/complete', authMiddleware, activityController.completeActivity);
router.get('/:userId/weekly', authMiddleware, activityController.getWeeklyStats);

module.exports = router;