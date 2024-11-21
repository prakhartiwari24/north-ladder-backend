import express from 'express';
const router = express.Router();
import { eventRouter } from './eventRoutes';

router.use('/api', eventRouter);

router.get('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };

  res.status(200).send(data);
});

router.all('*', async (req, res) => {
  res.status(404).send('Not found');
});

export { router };
