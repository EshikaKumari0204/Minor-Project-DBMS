const db = require('../db/db');

const pool = require('../db/db');

exports.create = async ({ therapist_id, client_id, session_date, session_time, duration }) => {
  const [res] = await pool.query(
    'INSERT INTO Sessions (therapist_id, client_id, session_date, session_time, duration) VALUES (?, ?, ?, ?, ?)',
    [therapist_id, client_id, session_date, session_time, duration]
  );
  return res.insertId;
};

exports.getByTherapist = async (therapistId) => {
  const [rows] = await pool.query(
    `SELECT s.*, u.name AS client_name
     FROM Sessions s
     JOIN Clients c ON s.client_id = c.client_id
     JOIN Users u ON c.user_id = u.user_id
     WHERE s.therapist_id = ?
     ORDER BY s.session_date ASC, s.session_time ASC`,
    [therapistId]
  );
  return rows;
};

exports.getByClient = async (clientId) => {
  const [rows] = await pool.query('SELECT * FROM Sessions WHERE client_id = ? ORDER BY session_date DESC', [clientId]);
  return rows;
};

exports.updateNotesAndComplete = async (sessionId, notes) => {
  await pool.query('UPDATE Sessions SET notes = ?, status = "completed" WHERE session_id = ?', [notes, sessionId]);
};
