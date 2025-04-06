import express from 'express';
import { PowerUp } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const powerUps = await PowerUp.findAll();
    res.json(powerUps);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const powerUp = await PowerUp.findByPk(req.params.id);
    if (powerUp) {
      res.json(powerUp);
    } else {
      res.status(404).send('Power-up not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { type, description, effect, duration } = req.body;
    const newPowerUp = await PowerUp.create({ type, description, effect, duration });
    res.status(201).json(newPowerUp);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { type, description, effect, duration } = req.body;
    const powerUp = await PowerUp.findByPk(req.params.id);
    if (powerUp) {
      await powerUp.update({ type, description, effect, duration });
      res.json(powerUp);
    } else {
      res.status(404).send('Power-up not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const powerUp = await PowerUp.findByPk(req.params.id);
    if (powerUp) {
      await powerUp.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Power-up not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;