import express from 'express';
import { enemies } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const enemies = await enemies.findAll();
    res.json(enemies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const enemy = await enemies.findByPk(req.params.id);
    if (enemy) {
      res.json(enemy);
    } else {
      res.status(404).send('Enemy not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post('/:id', async (req, res) => {  
    try {
    const { name, health, attack, defense, speed } = req.body;
    const enemy = await enemy.findByPk(req.params.id);
    if (enemy) {
        await enemy.update({ name, health, attack, defense, speed });
        res.json(enemy);
    } else {
        res.status(404).send('Enemy not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/:id', async (req, res) => {
  try {
    const enemy = await enemies.findByPk(req.params.id);
    if (enemy) {
      await enemy.update(req.body);
      res.json(enemy);
    } else {
      res.status(404).send('Enemy not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post('/:id/eliminar', async (req, res) => {
  try {
    const enemy = await enemies.findByPk(req.params.id);
    if (enemy) {
      await enemy.destroy();
      res.json(enemy);
    } else {
      res.status(404).send('Enemy not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
// Compare this snippet from back/routes/index.js:          