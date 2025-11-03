const db = require('../db/db');

const pool = require('../db/db');

exports.add = async ({ client_id, date, mood_score, notes }) => {
  const [res] = await pool.query('INSERT INTO Mood_Track (client_id, date, mood_score, notes) VALUES (?, ?, ?, ?)', [client_id, date, mood_score, notes]);
  return res.insertId;
};

exports.getByClient = async (clientId) => {
  const [rows] = await pool.query('SELECT date, mood_score FROM Mood_Track WHERE client_id = ? ORDER BY date ASC', [clientId]);
  return rows;
};