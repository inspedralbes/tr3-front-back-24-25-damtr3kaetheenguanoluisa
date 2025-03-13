import express from 'express';
import { Skin } from '../models/index.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const skins = await Skin.findAll();
    res.json(skins);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const skin = await Skin.findByPk(req.params.id);
    if (skin) {
      res.json(skin);
    } else {
      res.status(404).send('Skin not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newSkin = await Skin.create({ name, description, price });
    res.status(201).json(newSkin);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const skin = await Skin.findByPk(req.params.id);
    if (skin) {
      await skin.update({ name, description, price });
      res.json(skin);
    } else {
      res.status(404).send('Skin not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post('/:id', async (req, res) => {
  try {
    const skin = await Skin.findByPk(req.params.id);
    if (skin) {
      await skin.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Skin not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});