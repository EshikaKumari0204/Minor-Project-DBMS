const pool = require('../db/db');

async function createSession(req, res) {
  //create a session between therapist and client
  try {
    const { therapist_id, client_id, session_date, session_time, duration } = req.body;
    const [result] = await pool.query(
      INSERT INTO Sessions (therapist_id, client_id, session_date, session_time, duration, status) VALUES (?,?,?,?,?,?),
      [therapist_id, client_id, session_date, session_time, duration, 'scheduled']
    );
    res.json({ sessionId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
//get all sessions of a particular therapist 
async function getSessionsForTherapist(req, res) {
  try {
    const { therapist_id } = req.params;
    const [rows] = await pool.query('SELECT s.*, u.name as client_name FROM Sessions s JOIN Clients c ON s.client_id = c.client_id JOIN Users u ON c.user_id = u.user_id WHERE therapist_id = ? ORDER BY session_date DESC', [therapist_id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
//get all sessions of client
async function getSessionsForClient(req, res) {
  try {
    const { client_id } = req.params;
    const [rows] = await pool.query('SELECT s.*, u.name as therapist_name FROM Sessions s JOIN Therapists t ON s.therapist_id = t.therapist_id JOIN Users u ON t.user_id = u.user_id WHERE client_id = ? ORDER BY session_date DESC', [client_id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { createSession, getSessionsForTherapist, getSessionsForClient };
