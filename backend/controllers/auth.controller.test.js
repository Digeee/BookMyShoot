const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { register, login } = require('./auth.controller');

// Mock the database module
jest.mock('../config/database', () => ({
  execute: jest.fn()
}));

const db = require('../config/database');

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+94771234567',
          password: 'password123',
          role: 'client'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock database responses
      db.execute
        .mockResolvedValueOnce([[]]) // Check if user exists (no existing user)
        .mockResolvedValueOnce([{ insertId: 1 }]) // Insert user
        .mockResolvedValueOnce([[]]); // Insert profile for pro (not used here)

      // Mock bcrypt and jwt
      bcrypt.genSalt = jest.fn().mockResolvedValue('salt');
      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
      jwt.sign = jest.fn().mockReturnValue('token');
      db.execute.mockResolvedValueOnce([[{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '+94771234567', role: 'client' }]]);

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        token: 'token',
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+94771234567',
          role: 'client'
        }
      });
    });

    it('should return 409 if email already exists', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+94771234567',
          password: 'password123',
          role: 'client'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock database response for existing user
      db.execute.mockResolvedValueOnce([[{ id: 1 }]]);

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already exists' });
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'password123'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock database response
      db.execute.mockResolvedValueOnce([[
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+94771234567',
          role: 'client',
          password_hash: 'hashedPassword'
        }
      ]]);

      // Mock bcrypt and jwt
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue('token');

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith({
        token: 'token',
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+94771234567',
          role: 'client'
        }
      });
    });

    it('should return 401 for invalid credentials', async () => {
      const req = {
        body: {
          email: 'john@example.com',
          password: 'wrongpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock database response
      db.execute.mockResolvedValueOnce([[
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+94771234567',
          role: 'client',
          password_hash: 'hashedPassword'
        }
      ]]);

      // Mock bcrypt
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });
  });
});