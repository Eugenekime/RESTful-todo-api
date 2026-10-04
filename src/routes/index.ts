import { Router } from 'express';

import todoRoutes from './todos.js';

const router = Router();

router.use('/todos', todoRoutes);

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
  });
});

export default router;
