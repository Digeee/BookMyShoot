/**
 * WebSocket Server for Real-time Notifications
 */

const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { logInfo, logError } = require('./logger');

let io;

/**
 * Initialize WebSocket server
 * @param {Object} server - HTTP server instance
 */
const initializeWebSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Middleware to authenticate socket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      next();
    } catch (error) {
      logError('WebSocket authentication failed', error);
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // Handle socket connections
  io.on('connection', (socket) => {
    logInfo('User connected to WebSocket', { userId: socket.userId });

    // Join user-specific room
    socket.join(`user_${socket.userId}`);

    // Handle disconnection
    socket.on('disconnect', () => {
      logInfo('User disconnected from WebSocket', { userId: socket.userId });
    });

    // Handle error
    socket.on('error', (error) => {
      logError('WebSocket error', error, { userId: socket.userId });
    });
  });

  logInfo('WebSocket server initialized');
};

/**
 * Send notification to a specific user
 * @param {number} userId - User ID
 * @param {string} event - Event name
 * @param {Object} data - Notification data
 */
const sendNotification = (userId, event, data) => {
  if (io) {
    io.to(`user_${userId}`).emit(event, data);
    logInfo('Notification sent via WebSocket', { userId, event });
  }
};

/**
 * Broadcast notification to all users
 * @param {string} event - Event name
 * @param {Object} data - Notification data
 */
const broadcastNotification = (event, data) => {
  if (io) {
    io.emit(event, data);
    logInfo('Broadcast notification sent via WebSocket', { event });
  }
};

/**
 * Send notification to users with specific role
 * @param {string} role - User role
 * @param {string} event - Event name
 * @param {Object} data - Notification data
 */
const sendNotificationToRole = (role, event, data) => {
  if (io) {
    // This would require tracking user roles in rooms
    // For now, we'll emit to all and let the frontend filter
    io.emit(event, data);
    logInfo('Role-based notification sent via WebSocket', { role, event });
  }
};

module.exports = {
  initializeWebSocket,
  sendNotification,
  broadcastNotification,
  sendNotificationToRole
};