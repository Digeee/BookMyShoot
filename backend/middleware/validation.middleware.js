const Joi = require('joi');
const { logWarn } = require('../utils/logger');

// Enhanced validation options
const validationOptions = {
  abortEarly: false, // Return all validation errors
  allowUnknown: false, // Don't allow unknown keys
  stripUnknown: true // Remove unknown keys
};

const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must be less than 50 characters long',
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    phone: Joi.string().pattern(/^[+]?[0-9]{10,15}$/).optional().messages({
      'string.pattern.base': 'Phone number must be 10-15 digits'
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required'
    }),
    role: Joi.string().valid('client', 'pro').required().messages({
      'any.only': 'Role must be either client or pro',
      'any.required': 'Role is required'
    })
  });

  const { error, value } = schema.validate(req.body, validationOptions);
  
  // Sanitize and update request body with validated data
  req.body = value;
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    
    logWarn('Registration validation failed', { 
      errors: error.details,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      }
    });
  }
  
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required'
    })
  });

  const { error, value } = schema.validate(req.body, validationOptions);
  
  // Sanitize and update request body with validated data
  req.body = value;
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    
    logWarn('Login validation failed', { 
      errors: error.details,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      }
    });
  }
  
  next();
};

module.exports = {
  validateRegistration,
  validateLogin
};