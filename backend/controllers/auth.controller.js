const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    
    // Check if user already exists
    const [existingUser] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert user
    const [result] = await db.execute(
      'INSERT INTO users (name, email, phone, role, password_hash) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, role, hashedPassword]
    );
    
    // Create profile for pros
    if (role === 'pro') {
      await db.execute(
        'INSERT INTO profiles (user_id) VALUES (?)',
        [result.insertId]
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId, role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Get user data
    const [userRows] = await db.execute(
      'SELECT id, name, email, phone, role FROM users WHERE id = ?',
      [result.insertId]
    );
    
    const user = userRows[0];
    
    res.status(201).json({
      token,
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const [userRows] = await db.execute(
      'SELECT id, name, email, phone, role, password_hash FROM users WHERE email = ?',
      [email]
    );
    
    if (userRows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = userRows[0];
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password_hash from response
    delete user.password_hash;
    
    res.json({
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

module.exports = {
  register,
  login
};