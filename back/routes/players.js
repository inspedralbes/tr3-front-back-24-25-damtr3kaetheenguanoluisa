import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Player } from '../models/index.js';
import { verifyTokenMiddleware } from '../token.js';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username,email, password } = req.body;
    
    const existingPlayer = await Player.findOne({ where: { username } });
    if (existingPlayer) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const player = await Player.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'Player registered successfully',
      player: {
        id: player.id,
        username: player.username,
        email: player.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const player = await Player.findOne({ where: { username } });
    if (!player) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const validPassword = await bcrypt.compare(password, player.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    const token = jwt.sign(
      {
        id: player.id,
        username: player.username,
      },
      SECRET_KEY,
      { expiresIn: "1h" } 
    );
    res.json({
      success: true,
      message: 'Login successful',
      token,
      player: {
        id: player.id,
        username: player.username,
        bombs: player.bombs,
        victories: player.victories,
        enemiesDefeated: player.enemiesDefeated
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get('/:id/editar', verifyTokenMiddleware, async (req, res) => {
  try {
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const player = await Player.findByPk(req.params.id);
    if (player) {
      res.render('player/editar', { player });
    } else {
      res.status(404).json({ success: false, message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/:id', verifyTokenMiddleware, async (req, res) => {
  try {
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    const { username, password, bombs, victories, enemiesDefeated, velocity, skinId, powerUpId } = req.body;
    const player = await Player.findByPk(req.params.id);

    if (player) {
      const updatedData = { username, bombs, victories, enemiesDefeated, velocity, skinId, powerUpId };
      
      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      await player.update(updatedData);
      res.json({ success: true, message: "Player updated successfully" });
    } else {
      res.status(404).json({ success: false, message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', verifyTokenMiddleware, async (req, res) => {
  try {
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    const player = await Player.findByPk(req.params.id);
    if (player) {
      await player.destroy();
      res.status(200).json({ success: true, message: "Player deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;