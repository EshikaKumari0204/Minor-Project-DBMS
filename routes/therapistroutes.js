const express = require('express');
const router = express.Router();
const tCtrl = require('../controllers/therapistcontroller');

router.get('/details/:userId', tCtrl.detailsByUser);
router.get('/sessions/:therapistId', tCtrl.getUpcomingSessions);
router.post('/session/notes', tCtrl.addNotes);
router.get('/clients/:therapistId', tCtrl.getClients);
router.get('/client/:clientId/mood', tCtrl.getClientMoodHistory);

// compatibility route used earlier in frontend canvas chart:
router.get('/moodProgress/:client_id', tCtrl.getClientMoodHistory);

module.exports = router;
