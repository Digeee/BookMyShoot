/**
 * Notifications Controller - Handles user notifications
 */

const { catchAsync, NotFoundError } = require('../utils/errorHandler');
const { logInfo } = require('../utils/logger');
const { 
  getUnreadNotifications, 
  markAsRead, 
  markAllAsRead 
} = require('../models/NotificationModel');
const { sendNotification } = require('../utils/websocket');

/**
 * Get unread notifications for current user
 */
const getUnread = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const notifications = await getUnreadNotifications(userId);
  
  logInfo('Unread notifications fetched', { userId });
  
  res.json({
    success: true,
    data: notifications
  });
});

/**
 * Mark a notification as read
 */
const markRead = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  // In a full implementation, we would verify the notification belongs to the user
  await markAsRead(id);
  
  // Notify user via WebSocket that notification was marked as read
  sendNotification(userId, 'notificationRead', { id });
  
  logInfo('Notification marked as read', { userId, notificationId: id });
  
  res.json({
    success: true,
    message: 'Notification marked as read'
  });
});

/**
 * Mark all notifications as read
 */
const markAllRead = catchAsync(async (req, res) => {
  const userId = req.user.id;
  
  await markAllAsRead(userId);
  
  // Notify user via WebSocket that all notifications were marked as read
  sendNotification(userId, 'allNotificationsRead', {});
  
  logInfo('All notifications marked as read', { userId });
  
  res.json({
    success: true,
    message: 'All notifications marked as read'
  });
});

module.exports = {
  getUnread,
  markRead,
  markAllRead
};