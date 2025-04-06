import express from 'express';
import Log from '../models/log.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { service } = req.query;
    const query = service ? { service } : {};
    
    const logs = await Log.find(query)
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const log = new Log({
    service: req.body.service,
    message: req.body.message,
    type: req.body.type || 'info'
  });

  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
