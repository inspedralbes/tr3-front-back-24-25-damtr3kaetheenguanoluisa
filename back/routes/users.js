import express from 'express';
import { User } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post('/', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const newUser = await User.create({ userName, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update({ userName, email, password });
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;