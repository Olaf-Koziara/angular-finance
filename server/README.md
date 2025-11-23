# Angular Finance - Server

Node.js/Express backend for Angular Finance application with JWT authentication.

## Features

- **TypeScript** with strict mode
- **Express.js** web framework
- **Prisma ORM** for database management
- **PostgreSQL** database
- **JWT Authentication**
- **Zod** validation
- **Bcrypt** password hashing
- **Standardized API responses**
- **Comprehensive error handling**
- **Request logging** with Morgan
- **Security** with Helmet
- **CORS** support
- **Jest** for testing
- **Supertest** for API testing

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the server directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/angular_finance?schema=public"
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:4200
```

### 3. Database Setup

Run Prisma migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

#### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password123",
    "name": "John Doe" // optional
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "uuid",
        "email": "user@example.com",
        "name": "John Doe",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      },
      "token": "jwt-token"
    },
    "message": "User registered successfully"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "Password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "user": { /* user object */ },
      "token": "jwt-token"
    },
    "message": "Login successful"
  }
  ```

#### Get Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "message": "Profile retrieved successfully"
  }
  ```

### Health Check
- **GET** `/api/health`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Server is running",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

## Response Format

All API responses follow this standardized format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": { // Optional validation errors
    "field": ["error message"]
  }
}
```

## Validation Rules

### Registration
- **Email:** Valid email format, required
- **Password:** 
  - Minimum 8 characters
  - Must contain at least one uppercase letter
  - Must contain at least one lowercase letter
  - Must contain at least one number
- **Name:** Optional, max 100 characters

### Login
- **Email:** Valid email format, required
- **Password:** Required

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Project Structure

```
server/
├── prisma/
│   └── schema.prisma         # Database schema
├── src/
│   ├── config/               # Configuration files
│   │   ├── index.ts         # Environment config
│   │   └── database.ts      # Database connection
│   ├── controllers/          # Route controllers
│   │   └── auth.controller.ts
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validate.middleware.ts
│   ├── routes/              # API routes
│   │   ├── auth.routes.ts
│   │   └── index.ts
│   ├── services/            # Business logic
│   │   └── auth.service.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── errors.ts
│   │   ├── jwt.ts
│   │   ├── logger.ts
│   │   ├── password.ts
│   │   └── response.ts
│   ├── validators/          # Zod schemas
│   │   └── auth.validator.ts
│   ├── tests/               # Test files
│   │   └── auth.test.ts
│   ├── app.ts               # Express app setup
│   └── index.ts             # Server entry point
├── .env.example             # Example environment variables
├── jest.config.js           # Jest configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Helmet for security headers
- Input validation with Zod
- CORS configuration
- Error handling without sensitive data leaks
- Environment variable configuration

## Development Guidelines

1. **Always use async/await**, never callbacks
2. **Always validate input** with Zod schemas
3. **Always handle errors** explicitly
4. **Always use standardized response format**
5. **Always use TypeScript strict mode**
6. **Always include proper HTTP status codes**
7. **Always use middleware** for cross-cutting concerns
8. **Always log important operations**
9. **Always use environment variables** for configuration
