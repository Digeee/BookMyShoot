const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { catchAsync, ConflictError, AuthenticationError } = require('../utils/errorHandler');
const { logInfo, logError } = require('../utils/logger');

const register = catchAsync(async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  
  // Check if user already exists
  const [existingUser] = await db.execute(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );
  
  if (existingUser.length > 0) {
    throw new ConflictError('Email already exists');
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
  
  logInfo('User registered successfully', { userId: result.insertId, email });
  
  res.status(201).json({
    success: true,
    data: {
      token,
      user
    }
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  
  // Check if user exists
  const [userRows] = await db.execute(
    'SELECT id, name, email, phone, role, password_hash FROM users WHERE email = ?',
    [email]
  );
  
  if (userRows.length === 0) {
    throw new AuthenticationError('Invalid credentials');
  }
  
  const user = userRows[0];
  
  // Check password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new AuthenticationError('Invalid credentials');
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  // Remove password_hash from response
  delete user.password_hash;
  
  logInfo('User logged in successfully', { userId: user.id, email });
  
  res.json({
    success: true,
    data: {
      token,
      user
    }
  });
});

module.exports = {
  register,
  login
};