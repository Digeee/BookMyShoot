/**
 * Chatbot Model - Handles chatbot interactions and conversation history
 */

const { executeQuery } = require('../utils/dbUtils');

/**
 * Save a chatbot conversation message
 * @param {Object} messageData - Message data
 * @param {number} messageData.userId - User ID (can be null for anonymous)
 * @param {string} messageData.userMessage - User's message
 * @param {string} messageData.botResponse - Bot's response
 * @param {string} messageData.intent - Detected intent
 * @param {Object} messageData.context - Conversation context
 * @returns {Promise<Object>} Saved message record
 */
const saveConversation = async (messageData) => {
  const { userId, userMessage, botResponse, intent, context } = messageData;
  
  const query = `
    INSERT INTO chatbot_conversations 
    (user_id, user_message, bot_response, intent, context) 
    VALUES (?, ?, ?, ?, ?)
  `;
  
  const params = [
    userId || null,
    userMessage,
    botResponse,
    intent || 'unknown',
    JSON.stringify(context || {})
  ];
  
  const result = await executeQuery(query, params, 'save_chatbot_conversation');
  return { id: result.insertId, ...messageData };
};

/**
 * Get conversation history for a user
 * @param {number|null} userId - User ID or null for anonymous
 * @param {number} limit - Number of recent messages to retrieve
 * @returns {Promise<Array>} Conversation history
 */
const getConversationHistory = async (userId, limit = 10) => {
  const query = `
    SELECT id, user_message, bot_response, intent, context, created_at
    FROM chatbot_conversations 
    WHERE user_id ${userId ? '= ?' : 'IS NULL'}
    ORDER BY created_at DESC 
    LIMIT ?
  `;
  
  const params = userId ? [userId, limit] : [limit];
  const results = await executeQuery(query, params, 'get_chatbot_history');
  
  // Parse context JSON
  return results.map(row => ({
    ...row,
    context: row.context ? JSON.parse(row.context) : {}
  }));
};

/**
 * Get chatbot analytics data
 * @returns {Promise<Object>} Analytics data
 */
const getAnalytics = async () => {
  const query = `
    SELECT 
      COUNT(*) as total_conversations,
      COUNT(DISTINCT user_id) as unique_users,
      AVG(CHAR_LENGTH(user_message)) as avg_user_message_length,
      AVG(CHAR_LENGTH(bot_response)) as avg_bot_response_length,
      MIN(created_at) as first_conversation,
      MAX(created_at) as last_conversation
    FROM chatbot_conversations
  `;
  
  const results = await executeQuery(query, [], 'get_chatbot_analytics');
  return results[0];
};

/**
 * Get popular intents
 * @param {number} limit - Number of intents to retrieve
 * @returns {Promise<Array>} Popular intents
 */
const getPopularIntents = async (limit = 10) => {
  const query = `
    SELECT 
      intent,
      COUNT(*) as count
    FROM chatbot_conversations
    WHERE intent != 'unknown'
    GROUP BY intent
    ORDER BY count DESC
    LIMIT ?
  `;
  
  return await executeQuery(query, [limit], 'get_popular_intents');
};

module.exports = {
  saveConversation,
  getConversationHistory,
  getAnalytics,
  getPopularIntents
};