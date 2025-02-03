// backend/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
// Registrar novo usuário
router.post('/register', userController.registerUser);

// Login de usuário
router.post('/login', userController.loginUser);

// Obter infos do usuário
router.get('/:id', userController.getUser);

// PUT /users/:id       -> atualiza o usuário (protegido com JWT)
router.put('/:id', authMiddleware, userController.updateUser);

router.post('/:id/complete-activity', authMiddleware, userController.completeActivity);
router.put('/:id/customize', authMiddleware, userController.updateCustomization);
router.get('/:id/badges', authMiddleware, userController.getUserBadges);
router.get('/me', authMiddleware, userController.getCurrentUser);

module.exports = router;
