const db = require('../db/db');

const pool = require('../db/db');

exports.findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Users WHERE user_id = ?', [id]);
  return rows[0];
};
