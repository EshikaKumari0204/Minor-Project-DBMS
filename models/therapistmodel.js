const db = require('../db/db');

const pool = require('../db/db');

exports.findByUserId = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM Therapists WHERE user_id = ?', [userId]);
  return rows[0];
};

exports.getAll = async () => {
  const [rows] = await pool.query('SELECT t.*, u.name, u.email FROM Therapists t JOIN Users u ON t.user_id = u.user_id');
  return rows;
};