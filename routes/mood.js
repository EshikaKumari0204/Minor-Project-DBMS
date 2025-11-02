const express = require('express');
const router = express.Router();
const moodCtrl = require('../controllers/moodController');
const ensureAuthenticated = require('../middleware/auth');

router.post('/', ensureAuthenticated, moodCtrl.addMood);
router.get('/client/:client_id', ensureAuthenticated, moodCtrl.getMoodForClient);

module.exports = router;
