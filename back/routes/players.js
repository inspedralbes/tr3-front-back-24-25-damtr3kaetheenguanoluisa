import express from 'express';
import { Player } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.render('player/index', { players });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/nou', async (req, res) => {
  try {
    res.render('player/nou');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { userName, password, bombs, wins, enemiesEliminated, velocity, skinId, powerUpId } = req.body;
    await Player.create({ userName, password, bombs, wins, enemiesEliminated, velocity, skinId, powerUpId });
    res.redirect('/player');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      res.render('player/mostrar', { player });
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id/editar', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      res.render('player/editar', { player });
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { userName, password, bombs, wins, enemiesEliminated, velocity, skinId, powerUpId } = req.body;
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.update({ userName, password, bombs, wins, enemiesEliminated, velocity, skinId, powerUpId });
      res.redirect('/player');
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/:id/eliminar', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.destroy();
      res.redirect('/player');
    } else {
      res.status(404).send('Player not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;