/**
 * Chatbot Controller - Handles chatbot interactions
 */

const { catchAsync, ValidationError } = require('../../utils/errorHandler');
const { logInfo, logError } = require('../../utils/logger');
const { saveConversation, getConversationHistory } = require('../../models/ChatbotModel');

// Simple rule-based chatbot responses (to be replaced with AI service)
const getIntent = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'greeting';
  }
  
  if (lowerMessage.includes('book') || lowerMessage.includes('booking') || lowerMessage.includes('appointment')) {
    return 'booking_request';
  }
  
  if (lowerMessage.includes('photographer') || lowerMessage.includes('photo') || lowerMessage.includes('camera')) {
    return 'photography_inquiry';
  }
  
  if (lowerMessage.includes('videographer') || lowerMessage.includes('video') || lowerMessage.includes('film')) {
    return 'videography_inquiry';
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
    return 'pricing_inquiry';
  }
  
  if (lowerMessage.includes('thank')) {
    return 'thanks';
  }
  
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return 'farewell';
  }
  
  return 'general_inquiry';
};

// Generate bot response based on intent
const generateResponse = (intent, message, context) => {
  switch (intent) {
    case 'greeting':
      return "Hello! Welcome to BookMyShoot. How can I help you today?";
      
    case 'booking_request':
      return "I'd be happy to help you with booking. You can browse our professionals and services, then select a time that works for you. Would you like me to guide you through the process?";
      
    case 'photography_inquiry':
      return "We have talented photographers specializing in various styles including weddings, portraits, events, and commercial photography. You can browse our photographer profiles to see their portfolios and book directly.";
      
    case 'videography_inquiry':
      return "Our skilled videographers offer services for weddings, corporate events, music videos, and more. You can view their work samples and book a session that fits your needs.";
      
    case 'pricing_inquiry':
      return "Our pricing varies by professional and service type. Each photographer or videographer sets their own rates. You can view detailed pricing information on their service pages when browsing.";
      
    case 'thanks':
      return "You're welcome! Is there anything else I can assist you with?";
      
    case 'farewell':
      return "Goodbye! Feel free to reach out if you need any assistance with booking our talented professionals.";
      
    default:
      return "I'm here to help you with booking photographers and videographers in Sri Lanka. You can ask me about our services, how to book, pricing, or browse our professionals. What would you like to know?";
  }
};

/**
 * Handle chatbot message
 */
const handleMessage = catchAsync(async (req, res) => {
  const { message } = req.body;
  const userId = req.user ? req.user.id : null;
  
  if (!message || typeof message !== 'string') {
    throw new ValidationError('Message is required and must be a string');
  }
  
  // Detect intent
  const intent = getIntent(message);
  
  // Generate response
  const botResponse = generateResponse(intent, message, {});
  
  // Save conversation
  const conversationData = {
    userId,
    userMessage: message,
    botResponse,
    intent
  };
  
  await saveConversation(conversationData);
  
  logInfo('Chatbot message processed', { userId, intent });
  
  res.json({
    success: true,
    data: {
      response: botResponse,
      intent
    }
  });
});

/**
 * Get conversation history
 */
const getHistory = catchAsync(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  
  const history = await getConversationHistory(userId, limit);
  
  logInfo('Chatbot conversation history fetched', { userId, limit });
  
  res.json({
    success: true,
    data: history
  });
});

/**
 * Reset conversation context
 */
const resetContext = catchAsync(async (req, res) => {
  // In a real implementation, this would clear the user's conversation context
  // For now, we'll just return a success message
  
  logInfo('Chatbot context reset', { userId: req.user ? req.user.id : null });
  
  res.json({
    success: true,
    message: 'Conversation context has been reset'
  });
});

module.exports = {
  handleMessage,
  getHistory,
  resetContext
};