import express from 'express';
import { Level } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const levels = await Level.findAll();
    res.json(levels);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const level = await Level.findByPk(req.params.id);
    if (level) {
      res.json(level);
    } else {
      res.status(404).send('Level not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}); 
router.post('/', async (req, res) => {
  try {
    const { name, description, difficulty } = req.body;
    const newLevel = await Level.create({ name, description, difficulty });
    res.status(201).json(newLevel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { name, description, difficulty } = req.body;
    const level = await Level.findByPk(req.params.id);
    if (level) {
      await level.update({ name, description, difficulty });
      res.json(level);
    } else {
      res.status(404).send('Level not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post('/:id', async (req, res) => {
  try {
    const level = await Level.findByPk(req.params.id);
    if (level) {
      await level.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Level not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});