const sessionModel = require('../models/sessionmodel');
const therapistModel = require('../models/therapistmodel');
const moodModel = require('../models/moodmodel');
const db = require('../db/db');

exports.detailsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const t = await therapistModel.findByUserId(userId);
    if (!t) return res.status(404).json({ error: 'therapist not found' });
    res.json(t);
  } catch (err) { res.status(500).json({ error: 'DB error' }); }
};

exports.getUpcomingSessions = async (req, res) => {
  const therapistId = req.params.therapistId;
  try {
    const rows = await sessionModel.getByTherapist(therapistId);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'DB error' }); }
};

exports.addNotes = async (req, res) => {
  const { session_id } = req.body;
  const { notes } = req.body;
  if (!session_id) return res.status(400).json({ error: 'session_id required' });
  try {
    await sessionModel.updateNotesAndComplete(session_id, notes || '');
    res.json({ message: 'notes saved' });
  } catch (err) { res.status(500).json({ error: 'DB error' }); }
};

exports.getClients = async (req, res) => {
  const therapistId = req.params.therapistId;
  try {
    const [rows] = await db.query(`SELECT DISTINCT c.client_id, u.name, c.contact
                                   FROM Clients c
                                   JOIN Users u ON c.user_id = u.user_id
                                   JOIN Sessions s ON s.client_id = c.client_id
                                   WHERE s.therapist_id = ?`, [therapistId]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'DB error' }); }
};

exports.getClientMoodHistory = async (req, res) => {
  const clientId = req.params.clientId;
  try {
    const rows = await moodModel.getByClient(clientId);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: 'DB error' }); }
};
