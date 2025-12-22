const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { logInfo, logWarn } = require('../utils/logger');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logWarn('Authentication failed: No token provided', { 
        ip: req.ip, 
        userAgent: req.get('User-Agent'),
        url: req.originalUrl 
      });
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'No token, authorization denied'
        }
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token hasn't expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists and is active
    const [userRows] = await db.execute(
      'SELECT id, name, email, phone, role FROM users WHERE id = ? AND is_active = 1',
      [decoded.id]
    );
    
    if (userRows.length === 0) {
      logWarn('Authentication failed: Invalid token or user not found', { 
        userId: decoded.id,
        ip: req.ip, 
        userAgent: req.get('User-Agent')
      });
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Token is not valid or user account deactivated'
        }
      });
    }
    
    req.user = userRows[0];
    logInfo('User authenticated successfully', { userId: req.user.id, role: req.user.role });
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      logWarn('Authentication failed: Token expired', { 
        ip: req.ip, 
        userAgent: req.get('User-Agent')
      });
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Token has expired'
        }
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      logWarn('Authentication failed: Invalid token format', { 
        ip: req.ip, 
        userAgent: req.get('User-Agent')
      });
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'INVALID_TOKEN_FORMAT',
          message: 'Invalid token format'
        }
      });
    }
    
    logError('Authentication error', error);
    return res.status(401).json({ 
      success: false,
      error: {
        code: 'AUTHENTICATION_ERROR',
        message: 'Token is not valid'
      }
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      logWarn('Authorization failed: User not authenticated', { 
        ip: req.ip, 
        userAgent: req.get('User-Agent'),
        requiredRoles: roles
      });
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'NOT_AUTHENTICATED',
          message: 'Authentication required'
        }
      });
    }
    
    if (!roles.includes(req.user.role)) {
      logWarn('Authorization failed: Insufficient permissions', { 
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: roles
      });
      return res.status(403).json({ 
        success: false,
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Access denied - insufficient permissions'
        }
      });
    }
    
    logInfo('User authorized successfully', { userId: req.user.id, role: req.user.role, requiredRoles: roles });
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};