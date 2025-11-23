# Angular Finance

A modern finance management application built with Angular 20+ and Node.js/Express backend.

## 🚀 Features

### Frontend (Angular 20+)
- ✅ **Standalone Components** - No NgModules, using modern Angular architecture
- ✅ **Signals** - Reactive state management with Angular Signals
- ✅ **Modern Auth** - JWT-based authentication with improved UI
- ✅ **Type-Safe** - Full TypeScript strict mode
- ✅ **OnPush Change Detection** - Optimized performance
- ✅ **Reactive Forms** - Input/output functions instead of decorators

### Backend (Node.js/Express)
- ✅ **TypeScript** - Fully typed backend
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Prisma ORM** - Type-safe database access
- ✅ **Input Validation** - Zod schema validation
- ✅ **Security** - Helmet, CORS, bcrypt password hashing
- ✅ **Error Handling** - Standardized error responses

### Authentication Features
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Protected routes with auth guards
- ✅ Password strength validation
- ✅ Modern, responsive UI
- ✅ Loading states and error handling
- ✅ Password visibility toggle

## 📁 Project Structure

```
angular-finance/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Core services (auth, interceptors)
│   │   │   ├── features/  # Feature modules (auth, dashboard)
│   │   │   └── shared/    # Shared components
│   │   └── environments/  # Environment configs
│   └── package.json
│
└── server/                 # Node.js/Express backend
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── services/      # Business logic
    │   ├── middleware/    # Express middleware
    │   ├── routes/        # API routes
    │   ├── validators/    # Zod schemas
    │   └── utils/         # Helper functions
    ├── prisma/           # Database schema
    └── package.json
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure `.env` for development (SQLite):
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:4200
```

5. Generate Prisma client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

6. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Application will run on `http://localhost:4200`

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## 🔐 Security

### Current Security Features
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token-based authentication
- ✅ Input validation with Zod
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Secure error handling

### Production Recommendations
- [ ] Implement rate limiting on auth endpoints
- [ ] Use HTTPS/TLS
- [ ] Strong JWT secrets (32+ characters)
- [ ] Environment-based configuration
- [ ] Database connection encryption
- [ ] Regular security audits

See [server/SECURITY.md](server/SECURITY.md) for detailed security information.

## 📚 API Documentation

### Auth Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Test1234",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Test1234"
}
```

#### Get Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

## 🎨 UI/UX Features

- **Modern Gradient Design** - Beautiful purple gradient backgrounds
- **Password Strength Indicator** - Real-time validation feedback
- **Loading States** - Spinner animations during operations
- **Error Messages** - Clear, user-friendly error feedback
- **Responsive Design** - Mobile-friendly layouts
- **Accessibility** - ARIA labels and keyboard navigation

## 🚦 Development Workflow

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm run build
npm start
```

### Code Quality
Both projects use TypeScript strict mode and follow best practices.

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=development|production
DATABASE_URL=<database-connection-string>
JWT_SECRET=<strong-secret-key>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=<frontend-url>
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Additional Documentation

- [Server Setup Guide](server/SETUP.md)
- [Security Documentation](server/SECURITY.md)
- [Implementation Summary](server/IMPLEMENTATION_SUMMARY.md)

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
- Change `PORT` in server `.env`
- Change port in frontend with `ng serve --port 4201`

**Database connection errors:**
- Verify `DATABASE_URL` in `.env`
- Ensure database exists and is accessible

**CORS errors:**
- Verify `CORS_ORIGIN` in server `.env` matches frontend URL

**Build errors:**
- Delete `node_modules` and reinstall
- Clear Angular cache: `rm -rf .angular/cache`

## 📈 Future Enhancements

- [ ] Refresh token implementation
- [ ] Rate limiting middleware
- [ ] Role-based access control
- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth2 integration
- [ ] User profile management
- [ ] Financial tracking features
