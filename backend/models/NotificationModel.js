/**
 * Notification Model - Handles user notifications
 */

const { executeQuery } = require('../utils/dbUtils');

/**
 * Create a new notification
 * @param {Object} notificationData - Notification data
 * @param {number} notificationData.userId - User ID to send notification to
 * @param {string} notificationData.type - Type of notification
 * @param {string} notificationData.title - Notification title
 * @param {string} notificationData.message - Notification message
 * @param {Object} notificationData.data - Additional data
 * @returns {Promise<Object>} Created notification
 */
const createNotification = async (notificationData) => {
  const { userId, type, title, message, data } = notificationData;
  
  const query = `
    INSERT INTO notifications 
    (user_id, type, title, message, data) 
    VALUES (?, ?, ?, ?, ?)
  `;
  
  const params = [
    userId,
    type,
    title,
    message,
    JSON.stringify(data || {})
  ];
  
  const result = await executeQuery(query, params, 'create_notification');
  return { id: result.insertId, ...notificationData, createdAt: new Date() };
};

/**
 * Get unread notifications for a user
 * @param {number} userId - User ID
 * @returns {Promise<Array>} Unread notifications
 */
const getUnreadNotifications = async (userId) => {
  const query = `
    SELECT id, type, title, message, data, created_at
    FROM notifications 
    WHERE user_id = ? AND is_read = 0
    ORDER BY created_at DESC
  `;
  
  const params = [userId];
  const results = await executeQuery(query, params, 'get_unread_notifications');
  
  // Parse data JSON
  return results.map(row => ({
    ...row,
    data: row.data ? JSON.parse(row.data) : {}
  }));
};

/**
 * Mark notification as read
 * @param {number} notificationId - Notification ID
 * @returns {Promise<boolean>} Success status
 */
const markAsRead = async (notificationId) => {
  const query = 'UPDATE notifications SET is_read = 1, read_at = NOW() WHERE id = ?';
  const params = [notificationId];
  
  await executeQuery(query, params, 'mark_notification_as_read');
  return true;
};

/**
 * Mark all notifications as read for a user
 * @param {number} userId - User ID
 * @returns {Promise<boolean>} Success status
 */
const markAllAsRead = async (userId) => {
  const query = 'UPDATE notifications SET is_read = 1, read_at = NOW() WHERE user_id = ? AND is_read = 0';
  const params = [userId];
  
  await executeQuery(query, params, 'mark_all_notifications_as_read');
  return true;
};

module.exports = {
  createNotification,
  getUnreadNotifications,
  markAsRead,
  markAllAsRead
};