const pool = require('../db/db');
async function addMood(req, res) {
  //add mood data  to database table
  try {
    const { client_id, date, mood_score, notes } = req.body;
    const [result] = await pool.query('INSERT INTO Mood_Track (client_id, date, mood_score, notes) VALUES (?,?,?,?)', [client_id, date, mood_score, notes]);
    res.json({ moodId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
//mood for a particular client
async function getMoodForClient(req, res) {
  try {
    const { client_id } = req.params;
    const [rows] = await pool.query('SELECT date, mood_score, notes FROM Mood_Track WHERE client_id = ? ORDER BY date ASC', [client_id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = { addMood, getMoodForClient };
