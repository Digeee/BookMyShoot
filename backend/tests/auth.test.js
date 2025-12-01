const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock the database
jest.mock('../config/database', () => ({
  execute: jest.fn()
}));

const db = require('../config/database');

// Create express app for testing
const app = express();
app.use(express.json());

// Import and use auth routes
const authRoutes = require('../routes/auth.routes');
app.use('/api/v1/auth', authRoutes);

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      // Mock database responses
      db.execute
        .mockResolvedValueOnce([[]]) // Check if user exists
        .mockResolvedValueOnce([{ insertId: 1 }]) // Insert user
        .mockResolvedValueOnce([[]]) // Insert profile
        .mockResolvedValueOnce([[{ id: 1, name: 'John Doe', email: 'john@example.com', phone: '+94771234567', role: 'client' }]]); // Get user

      // Mock bcrypt and jwt
      bcrypt.genSalt = jest.fn().mockResolvedValue('salt');
      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
      jwt.sign = jest.fn().mockReturnValue('token');

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+94771234567',
          password: 'password123',
          role: 'client'
        })
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id', 1);
      expect(response.body.user).toHaveProperty('name', 'John Doe');
      expect(response.body.user).toHaveProperty('email', 'john@example.com');
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'John',
          // Missing email and password
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 409 if email already exists', async () => {
      // Mock database response for existing user
      db.execute.mockResolvedValueOnce([[{ id: 1 }]]);

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+94771234567',
          password: 'password123',
          role: 'client'
        })
        .expect(409);

      expect(response.body).toHaveProperty('error', 'Email already exists');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login user successfully', async () => {
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
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      // Mock jwt
      jwt.sign = jest.fn().mockReturnValue('token');

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id', 1);
      expect(response.body.user).toHaveProperty('name', 'John Doe');
    });

    it('should return 401 for invalid credentials', async () => {
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

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'john@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should return 401 for non-existent user', async () => {
      // Mock database response for non-existent user
      db.execute.mockResolvedValueOnce([[]]);

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
  });
});