# BookMyShoot Deployment Guide

This guide explains how to deploy the BookMyShoot application in different environments.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- MySQL 8.0+ (if not using Docker)

## Local Development Deployment

### Option 1: Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd bookmyshoot
```

2. Update environment variables in `docker-compose.yml`:
   - Replace placeholder values for JWT_SECRET, Cloudinary credentials, etc.

3. Build and start all services:
```bash
docker-compose up --build
```

4. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:3000
   - Database: localhost:3306

### Option 2: Manual Setup

#### Backend Setup:

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
   - Database credentials
   - JWT secret
   - Cloudinary credentials

5. Start the server:
```bash
npm run dev
```

#### Frontend Setup:

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Production Deployment

### Using Docker Compose

1. Update the `docker-compose.yml` file for production:
   - Change passwords and secrets
   - Adjust resource limits if needed
   - Configure domain names and SSL certificates

2. Build and start in detached mode:
```bash
docker-compose up --build -d
```

3. Check service status:
```bash
docker-compose ps
```

### Manual Production Deployment

#### Backend:

1. Install dependencies:
```bash
cd backend
npm ci --only=production
```

2. Set environment variables:
```bash
export NODE_ENV=production
export PORT=3000
export DB_HOST=your_database_host
export DB_USER=your_database_user
export DB_PASSWORD=your_database_password
export DB_NAME=bookmyshoot
export JWT_SECRET=your_secure_jwt_secret
# Add other required environment variables
```

3. Start the application:
```bash
npm start
```

#### Frontend:

1. Build the application:
```bash
cd frontend
npm ci
npm run build
```

2. Serve the built files using a web server like Nginx or Apache.

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment | development/production |
| PORT | Server port | 3000 |
| DB_HOST | Database host | localhost |
| DB_USER | Database user | root |
| DB_PASSWORD | Database password | password |
| DB_NAME | Database name | bookmyshoot |
| JWT_SECRET | Secret for JWT tokens | your_jwt_secret |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | your_cloud_name |
| CLOUDINARY_API_KEY | Cloudinary API key | your_api_key |
| CLOUDINARY_API_SECRET | Cloudinary API secret | your_api_secret |

## Database Initialization

The database schema is automatically initialized when using Docker Compose. For manual setup:

1. Create the database:
```sql
CREATE DATABASE bookmyshoot;
```

2. Apply the schema:
```bash
mysql -u username -p bookmyshoot < database/schema.sql
```

## Testing

Run backend tests:
```bash
cd backend
npm test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## Monitoring and Maintenance

- Monitor logs: `docker-compose logs -f`
- Backup database regularly
- Update dependencies periodically
- Monitor server resources

## Troubleshooting

Common issues and solutions:

1. **Port conflicts**: Change ports in docker-compose.yml
2. **Database connection errors**: Check DB_HOST, DB_USER, DB_PASSWORD
3. **Permission denied**: Ensure proper file permissions
4. **Missing environment variables**: Check all required variables are set

For additional support, check the application logs or contact the development team.