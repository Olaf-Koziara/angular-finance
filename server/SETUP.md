# Server Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Set up Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

For **development** (SQLite):
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:4200
```

For **production** (PostgreSQL):
```env
PORT=3000
NODE_ENV=production
DATABASE_URL="postgresql://user:password@localhost:5432/angular_finance?schema=public"
JWT_SECRET=your-very-strong-secret-key-min-32-characters
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-production-domain.com
```

### 3. Update Prisma Schema for Production
If using PostgreSQL, update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 4. Generate Prisma Client
```bash
npm run prisma:generate
```

### 5. Run Database Migrations
```bash
npm run prisma:migrate
```

### 6. Start the Server

**Development (with hot reload):**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

## Testing the API

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Test1234","name":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Test1234"}'
```

### Get Profile (requires token)
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Database Management

### View Database (Prisma Studio)
```bash
npm run prisma:studio
```

### Create a New Migration
```bash
npm run prisma:migrate
```

## Running Tests
```bash
npm test
```

## Security Notes

1. **Always** change the `JWT_SECRET` in production to a strong random string (32+ characters)
2. **Always** use HTTPS in production
3. Consider implementing rate limiting (see SECURITY.md)
4. Regularly update dependencies with `npm audit`

## Troubleshooting

### Database Connection Issues
- Check that `DATABASE_URL` is correct in `.env`
- For PostgreSQL, ensure the database exists and is accessible
- For SQLite, ensure write permissions to the database file location

### Port Already in Use
If port 3000 is already in use, change the `PORT` in `.env`

### JWT Token Errors
- Ensure `JWT_SECRET` matches between server restarts
- Check token expiration with `JWT_EXPIRES_IN`
