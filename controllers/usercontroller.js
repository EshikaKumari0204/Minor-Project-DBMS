const pool = require('../db/db');

async function getAllUsers(req, res) {
  //get all the users from database
  try {
    const [rows] = await pool.query('SELECT user_id, name, email, role FROM Users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getAllUsers };
