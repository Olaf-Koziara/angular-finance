import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

// Health check route
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/auth', authRoutes);

export default router;
