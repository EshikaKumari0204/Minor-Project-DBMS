const express = require('express');
const router = express.Router();
const sessionCtrl = require('../controllers/sessionController');
const ensureAuthenticated = require('../middleware/auth');

router.post('/', ensureAuthenticated, sessionCtrl.createSession);
router.get('/therapist/:therapist_id', ensureAuthenticated, sessionCtrl.getSessionsForTherapist);
router.get('/client/:client_id', ensureAuthenticated, sessionCtrl.getSessionsForClient);

module.exports = router;
