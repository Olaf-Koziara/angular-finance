import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import { corsConfig } from './config/jwt.config.js';
import { authenticateToken, requireRoles } from './middleware/auth.middleware.js';

const app = express();
const PORT = process.env['PORT'] || 3000;

// Middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected resource' });
});

// Example admin-only route
app.get('/api/admin', authenticateToken, requireRoles(['admin']), (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/auth/login     - Authenticate user');
  console.log('  POST /api/auth/refresh   - Refresh access token');
  console.log('  POST /api/auth/logout    - Logout user');
  console.log('  GET  /api/auth/me        - Get current user (protected)');
  console.log('  GET  /api/protected      - Protected resource');
  console.log('  GET  /api/admin          - Admin-only resource');
});

export default app;
