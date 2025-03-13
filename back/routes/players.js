import express from 'express';
import { player, Categoria } from '../models/index.js';

const router = express.Router();

// List all users
router.get('/', async (req, res) => {
  try {
    const players = await player.findAll();
    res.render('player/index', { players });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Form to add a new user (includes the list of categories)
router.get('/nou', async (req, res) => {
  try {
    const categories = await Categoria.findAll();
    res.render('player/nou', { categories });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
    const { marca, model, descripcio, potencia, categoriaId } = req.body;
    await player.create({ marca, model, descripcio, potencia, categoriaId });
    res.redirect('/player');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show details of a user
router.get('/:id', async (req, res) => {
  try {
    const user = await player.findByPk(req.params.id);
    if (user) {
      res.render('player/mostrar', { player: user });
    } else {
      res.status(404).send('player no trobat');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Form to edit a user (includes the list of categories)
router.get('/:id/editar', async (req, res) => {
  try {
    const user = await player.findByPk(req.params.id);
    if (user) {
      const categories = await Categoria.findAll();
      res.render('player/editar', { player: user, categories });
    } else {
      res.status(404).send('player no trobat');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a user
router.post('/:id', async (req, res) => {
  try {
    const { marca, model, descripcio, potencia, categoriaId } = req.body;
    const user = await player.findByPk(req.params.id);
    if (user) {
      await user.update({ marca, model, descripcio, potencia, categoriaId });
      res.redirect('/player');
    } else {
      res.status(404).send('player no trobat');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a user
router.post('/:id/eliminar', async (req, res) => {
  try {
    const user = await player.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.redirect('/player');
    } else {
      res.status(404).send('player no trobat');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;