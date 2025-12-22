const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { globalErrorHandler } = require('./utils/errorHandler');
const { logInfo, logError } = require('./utils/logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logInfo(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.'
    }
  }
});
app.use(limiter);

// Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/services', require('./routes/services.routes'));
app.use('/api/v1/profiles', require('./routes/profiles.routes'));
app.use('/api/v1/bookings', require('./routes/bookings.routes'));
app.use('/api/v1/payments', require('./routes/payments.routes'));
app.use('/api/v1/dashboard', require('./routes/dashboard.routes'));
app.use('/api/v1/admin', require('./routes/admin.routes'));
app.use('/api/v1/chatbot', require('./routes/chatbot/chatbot.routes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true,
    status: 'OK', 
    message: 'BookMyShoot API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'Route not found'
    }
  });
});

// Global error handling middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  logInfo(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});