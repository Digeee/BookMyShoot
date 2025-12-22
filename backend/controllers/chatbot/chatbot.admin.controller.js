/**
 * Chatbot Admin Controller - Handles admin monitoring of chatbot
 */

const { catchAsync } = require('../../utils/errorHandler');
const { logInfo } = require('../../utils/logger');
const { getAnalytics, getPopularIntents } = require('../../models/ChatbotModel');

/**
 * Get chatbot analytics
 */
const getAnalyticsData = catchAsync(async (req, res) => {
  const analytics = await getAnalytics();
  const popularIntents = await getPopularIntents(10);
  
  logInfo('Chatbot analytics fetched by admin', { adminId: req.user.id });
  
  res.json({
    success: true,
    data: {
      analytics,
      popularIntents
    }
  });
});

/**
 * Get recent conversations
 */
const getRecentConversations = catchAsync(async (req, res) => {
  // This would fetch recent conversations for monitoring
  // Implementation would depend on specific requirements
  
  logInfo('Recent chatbot conversations fetched by admin', { adminId: req.user.id });
  
  res.json({
    success: true,
    message: 'Feature to be implemented',
    data: []
  });
});

module.exports = {
  getAnalyticsData,
  getRecentConversations
};