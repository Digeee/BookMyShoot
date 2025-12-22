const { createBooking, acceptBooking, rejectBooking, getUserBookings } = require('./bookings.controller');

// Mock the database module
jest.mock('../config/database', () => ({
  execute: jest.fn()
}));

const db = require('../config/database');

describe('Bookings Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a new booking successfully', async () => {
      const req = {
        body: {
          service_id: 1,
          package_id: 1,
          date: '2025-12-20',
          start_time: '09:00:00',
          end_time: '17:00:00'
        },
        user: {
          id: 2,
          role: 'client'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock database responses
      db.execute
        .mockResolvedValueOnce([[{ pro_id: 1, base_price: 25000 }]]) // Service check
        .mockResolvedValueOnce([[{ price: 25000 }]]) // Package check
        .mockResolvedValueOnce([[{ id: 1 }]]) // Availability check
        .mockResolvedValueOnce([{ insertId: 1 }]) // Create booking
        .mockResolvedValueOnce([[]]) // Update availability
        .mockResolvedValueOnce([[{ id: 1, client_id: 2, pro_id: 1, service_id: 1, package_id: 1, date: '2025-12-20', start_time: '09:00:00', end_time: '17:00:00', total_price: 25000 }]]); // Get created booking

      await createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return 404 if service not found', async () => {
      const req = {
        body: {
          service_id: 999,
          date: '2025-12-20',
          start_time: '09:00:00',
          end_time: '17:00:00'
        },
        user: {
          id: 2
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock database response for non-existent service
      db.execute.mockResolvedValueOnce([[]]);

      await createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ 
        success: false,
        error: {
          code: 'SERVICE_NOT_FOUND',
          message: 'Service not found or inactive'
        }
      });
    });
  });

  describe('acceptBooking', () => {
    it('should accept a booking successfully', async () => {
      const req = {
        params: {
          id: '1'
        },
        user: {
          id: 1,
          role: 'pro'
        }
      };

      const res = {
        json: jest.fn()
      };

      // Mock database responses
      db.execute
        .mockResolvedValueOnce([[{ id: 1, pro_id: 1, status: 'pending' }]]) // Booking check
        .mockResolvedValueOnce([[]]); // Update booking status

      await acceptBooking(req, res);

      expect(res.json).toHaveBeenCalledWith({ 
        success: true,
        message: 'Booking accepted successfully' 
      });
    });

    it('should return 404 if booking not found', async () => {
      const req = {
        params: {
          id: '999'
        },
        user: {
          id: 1,
          role: 'pro'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock database response for non-existent booking
      db.execute.mockResolvedValueOnce([[]]);

      await acceptBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ 
        success: false,
        error: {
          code: 'BOOKING_NOT_FOUND',
          message: 'Booking not found'
        }
      });
    });
  });

  describe('rejectBooking', () => {
    it('should reject a booking successfully', async () => {
      const req = {
        params: {
          id: '1'
        },
        user: {
          id: 1,
          role: 'pro'
        }
      };

      const res = {
        json: jest.fn()
      };

      // Mock database responses
      const mockBooking = {
        id: 1,
        pro_id: 1,
        status: 'pending',
        date: '2025-12-20',
        start_time: '09:00:00',
        end_time: '17:00:00'
      };

      db.execute
        .mockResolvedValueOnce([[mockBooking]]) // Booking check
        .mockResolvedValueOnce([[]]) // Update booking status
        .mockResolvedValueOnce([[]]); // Free up availability

      await rejectBooking(req, res);

      expect(res.json).toHaveBeenCalledWith({ 
        success: true,
        message: 'Booking rejected successfully' 
      });
    });
  });

  describe('getUserBookings', () => {
    it('should return client bookings', async () => {
      const req = {
        user: {
          id: 2,
          role: 'client'
        }
      };

      const res = {
        json: jest.fn()
      };

      // Mock database response
      const mockBookings = [
        {
          id: 1,
          client_id: 2,
          pro_id: 1,
          service_id: 1,
          date: '2025-12-20',
          start_time: '09:00:00',
          end_time: '17:00:00',
          status: 'pending',
          total_price: 25000
        }
      ];

      db.execute.mockResolvedValueOnce([mockBookings]);

      await getUserBookings(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockBookings,
        pagination: expect.any(Object)
      });
    });

    it('should return pro bookings', async () => {
      const req = {
        user: {
          id: 1,
          role: 'pro'
        }
      };

      const res = {
        json: jest.fn()
      };

      // Mock database response
      const mockBookings = [
        {
          id: 1,
          client_id: 2,
          pro_id: 1,
          service_id: 1,
          date: '2025-12-20',
          start_time: '09:00:00',
          end_time: '17:00:00',
          status: 'pending',
          total_price: 25000
        }
      ];

      db.execute.mockResolvedValueOnce([mockBookings]);

      await getUserBookings(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockBookings,
        pagination: expect.any(Object)
      });
    });
  });
});