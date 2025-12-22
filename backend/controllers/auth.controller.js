const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { catchAsync, ConflictError, AuthenticationError } = require('../utils/errorHandler');
const { logInfo, logError, logWarn } = require('../utils/logger');

const register = catchAsync(async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  
  // Additional security checks
  
  // Check if email domain is from disposable email providers (simplified check)
  const disposableDomains = ['tempmail.com', 'throwawaymail.com', '10minutemail.com'];
  const emailDomain = email.split('@')[1];
  if (disposableDomains.includes(emailDomain)) {
    logWarn('Registration attempt with disposable email blocked', { email, ip: req.ip });
    throw new ConflictError('Disposable email addresses are not allowed');
  }
  
  // Check if user already exists
  const [existingUser] = await db.execute(
    'SELECT id FROM users WHERE email = ?',
    [email]
  );
  
  if (existingUser.length > 0) {
    logWarn('Registration attempt with existing email', { email, ip: req.ip });
    throw new ConflictError('Email already exists');
  }
  
  // Hash password with higher salt rounds for better security
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Insert user with additional security fields
  const [result] = await db.execute(
    'INSERT INTO users (name, email, phone, role, password_hash, is_active, created_ip) VALUES (?, ?, ?, ?, ?, 1, ?)',
    [name, email, phone, role, hashedPassword, req.ip]
  );
  
  // Create profile for pros
  if (role === 'pro') {
    await db.execute(
      'INSERT INTO profiles (user_id) VALUES (?)',
      [result.insertId]
    );
  }
  
  // Generate JWT token with additional security
  const payload = { 
    id: result.insertId, 
    role,
    // Add issued at time for additional validation
    iat: Math.floor(Date.now() / 1000)
  };
  
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { 
      expiresIn: '7d',
      // Add issuer and subject for additional security
      issuer: 'bookmyshoot',
      subject: result.insertId.toString()
    }
  );
  
  // Get user data
  const [userRows] = await db.execute(
    'SELECT id, name, email, phone, role FROM users WHERE id = ?',
    [result.insertId]
  );
  
  const user = userRows[0];
  
  logInfo('User registered successfully', { userId: result.insertId, email, ip: req.ip });
  
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
  
  // Check if user exists and is active
  const [userRows] = await db.execute(
    'SELECT id, name, email, phone, role, password_hash, is_active FROM users WHERE email = ?',
    [email]
  );
  
  if (userRows.length === 0) {
    logWarn('Login attempt with non-existent email', { email, ip: req.ip });
    throw new AuthenticationError('Invalid credentials');
  }
  
  const user = userRows[0];
  
  // Check if account is active
  if (!user.is_active) {
    logWarn('Login attempt with deactivated account', { email, userId: user.id, ip: req.ip });
    throw new AuthenticationError('Account has been deactivated. Please contact support.');
  }
  
  // Check password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    logWarn('Login attempt with invalid password', { email, userId: user.id, ip: req.ip });
    throw new AuthenticationError('Invalid credentials');
  }
  
  // Generate JWT token with additional security
  const payload = { 
    id: user.id, 
    role: user.role,
    // Add issued at time for additional validation
    iat: Math.floor(Date.now() / 1000)
  };
  
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { 
      expiresIn: '7d',
      // Add issuer and subject for additional security
      issuer: 'bookmyshoot',
      subject: user.id.toString()
    }
  );
  
  // Update last login timestamp
  await db.execute(
    'UPDATE users SET last_login = NOW() WHERE id = ?',
    [user.id]
  );
  
  // Remove sensitive fields from response
  delete user.password_hash;
  delete user.is_active;
  
  logInfo('User logged in successfully', { userId: user.id, email, ip: req.ip });
  
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