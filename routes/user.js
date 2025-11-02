const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const ensureAuthenticated = require('../middleware/auth');
const requireRole = require('../middleware/role');

// Admin-only
router.get('/', ensureAuthenticated, requireRole('admin'), userCtrl.getAllUsers);

module.exports = router;
