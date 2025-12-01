# BookMyShoot

A marketplace web application for booking photographers, videographers, and editors in Sri Lanka.

## Overview

BookMyShoot is a platform that connects clients with professional photographers, videographers, and editors. Clients can browse profiles, view portfolios, check availability, and book services. Professionals can showcase their work, manage their schedules, and receive job bookings.

## Features

### For Clients:
- Browse and search for professionals by category, location, and rating
- View detailed profiles and portfolios
- Check real-time availability
- Book services with preferred packages
- Communicate with professionals through messaging
- Leave reviews and ratings

### For Professionals (Pros):
- Create and manage professional profiles
- Upload and organize portfolios
- Set availability and pricing
- Manage bookings and appointments
- Communicate with clients
- Receive payments through integrated payment gateways

### For Administrators:
- Manage users and content
- Monitor transactions and commissions
- Handle disputes and support tickets
- View analytics and reports

## Technology Stack

### Frontend:
- React with Vite
- Tailwind CSS for styling
- React Router for navigation
- i18next for internationalization (English, Sinhala, Tamil)

### Backend:
- Node.js with Express.js
- MySQL 8.0 database
- JWT for authentication
- Cloudinary for media storage

### Payment Integration:
- PayHere (Sri Lankan payment gateway)
- Stripe (international payments)

## Project Structure

```
bookmyshoot/
├── backend/          # Node.js Express API server
├── frontend/         # React frontend application
├── database/         # Database schema and migrations
├── docs/             # Documentation files
└── docker-compose.yml # Docker orchestration
```

## Quick Start

### Using Docker (Recommended):

1. Clone the repository:
```bash
git clone <repository-url>
cd bookmyshoot
```

2. Update environment variables in `docker-compose.yml`

3. Start all services:
```bash
docker-compose up --build
```

4. Access the application:
   - Frontend: http://localhost
   - API: http://localhost:3000

### Manual Setup:

Refer to [Deployment Guide](docs/deployment-guide.md) for detailed instructions.

## API Documentation

The API is documented using OpenAPI specification. You can find:
- YAML specification: [docs/api-spec.yaml](docs/api-spec.yaml)
- Postman collection: [docs/postman-collection.json](docs/postman-collection.json)

## Development

### Backend Development:
```bash
cd backend
npm install
npm run dev
```

### Frontend Development:
```bash
cd frontend
npm install
npm run dev
```

## Testing

Run tests for both frontend and backend:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Internationalization

The application supports three languages:
- English (default)
- Sinhala (සිංහල)
- Tamil (தமிழ்)

Language can be switched using the language selector in the navigation bar.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For support, contact the development team or create an issue in the repository.