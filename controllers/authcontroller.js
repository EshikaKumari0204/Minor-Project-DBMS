const pool = require('../db/db');
const bcrypt = require('bcrypt');
async function register(req, res){
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing fields' });
   //checks if email exists 
    const [existing] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existing.length) return res.status(400).json({ message: 'Email exists' });

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO Users (name,email,password,role) VALUES (?,?,?,?)', [name, email, hashed, role]);

    // create role-specific row and add to table in databse 
    const userId = result.insertId;
    if (role === 'therapist') await pool.query('INSERT INTO Therapists (user_id, specialization, experience, availability) VALUES (?,?,?,?)', [userId, '', 0, '']);
    if (role === 'client') await pool.query('INSERT INTO Clients (user_id, age, gender, contact) VALUES (?,?,?,?)', [userId, 0, 'Other', '']);

    req.session.user = { id: userId, name, role };
    res.json({ message: 'Registered', user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
//check email and password and then create a session and then user logis in 
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (!rows.length) return res.status(400).json({ message: 'Invalid creds' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid creds' });
      
    req.session.user = { id: user.user_id, name: user.name, role: user.role };
    res.json({ message: 'Logged in', user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
//destroy the session
function logout(req, res) {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
}

module.exports = { register, login, logout };
