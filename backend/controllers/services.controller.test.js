const { getServices, getServiceById } = require('./services.controller');

// Mock the database module
jest.mock('../config/database', () => ({
  execute: jest.fn()
}));

const db = require('../config/database');

describe('Services Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getServices', () => {
    it('should return services with filters', async () => {
      const req = {
        query: {
          category: 'Photography',
          location: 'Colombo',
          minPrice: '1000',
          maxPrice: '50000',
          rating: '4'
        }
      };

      const res = {
        json: jest.fn()
      };

      // Mock database response
      const mockServices = [
        {
          id: 1,
          pro_id: 1,
          title: 'Wedding Photography',
          category: 'Photography',
          base_price: 25000,
          business_name: 'John Photography',
          avg_rating: 4.5
        }
      ];

      db.execute.mockResolvedValueOnce([mockServices]);

      await getServices(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockServices,
        pagination: expect.any(Object)
      });
      expect(db.execute).toHaveBeenCalled();
    });

    it('should return services without filters', async () => {
      const req = {
        query: {}
      };

      const res = {
        json: jest.fn()
      };

      // Mock database response
      const mockServices = [
        {
          id: 1,
          pro_id: 1,
          title: 'Wedding Photography',
          category: 'Photography',
          base_price: 25000,
          business_name: 'John Photography',
          avg_rating: 4.5
        }
      ];

      db.execute.mockResolvedValueOnce([mockServices]);

      await getServices(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockServices,
        pagination: expect.any(Object)
      });
    });
  });

  describe('getServiceById', () => {
    it('should return service details with packages and availability', async () => {
      const req = {
        params: {
          id: '1'
        }
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // Mock database responses
      const mockService = [{
        id: 1,
        pro_id: 1,
        title: 'Wedding Photography',
        category: 'Photography',
        base_price: 25000,
        business_name: 'John Photography',
        bio: 'Professional photographer',
        location_city: 'Colombo',
        location_area: 'Colombo 03',
        avg_rating: 4.5
      }];

      const mockPackages = [
        {
          id: 1,
          service_id: 1,
          name: 'Basic Package',
          price: 25000,
          hours: 8,
          details: '8 hours coverage'
        }
      ];

      const mockAvailability = [
        {
          id: 1,
          pro_id: 1,
          date: '2025-12-20',
          start_time: '09:00:00',
          end_time: '17:00:00',
          is_booked: 0
        }
      ];

      db.execute
        .mockResolvedValueOnce([mockService])
        .mockResolvedValueOnce([mockPackages])
        .mockResolvedValueOnce([mockAvailability]);

      await getServiceById(req, res);

      const expectedResponse = {
        ...mockService[0],
        packages: mockPackages,
        availability: mockAvailability
      };

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: expectedResponse
      });
    });

    it('should return 404 if service not found', async () => {
      const req = {
        params: {
          id: '999'
        }
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      // Mock database response for non-existent service
      db.execute.mockResolvedValueOnce([[]]);

      await getServiceById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ 
        success: false,
        error: {
          code: 'SERVICE_NOT_FOUND',
          message: 'Service not found'
        }
      });
    });
  });
});