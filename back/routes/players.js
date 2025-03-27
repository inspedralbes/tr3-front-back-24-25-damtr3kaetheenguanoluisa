import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Player } from '../models/index.js';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    console.log("Datos recibidos en /register:", req.body);
    const { username, email, password } = req.body;

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
    console.log("Login request received:", req.body);
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

    res.json({
      success: true,
      message: 'Login successful',
      player: {
        id: player.id,
        username: player.username,
        bombs: player.bombs,
        speed:player.speed,
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

router.get('/', async (req, res) => {
  try {
    const players = await Player.findAll({ attributes: { exclude: ['password'] } });
    res.json({ success: true, players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (player) {
      res.json({ success: true, player });
    } else {
      res.status(404).json({ success: false, message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

  router.post('/updateUsers', async (req, res) => {
    try {
      const players = req.body.players;

      for (const player of players) {
        const dbPlayer = await Player.findByPk(player.id);

        if (dbPlayer) {
          await dbPlayer.update({
            bombAmount: player.bombAmount,
            bombsUsed: player.bombsUsed,
            speed: player.speed,
            victories: player.victories,
            enemiesDefeated: player.enemiesDefeated
          });
        }
      }

      return res.json({
        success: true,
        message: "Stats actualitzades correctament"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
});


router.put('/:id', async (req, res) => {
  try {
    const { username, password, bombs, bombsUsed, speed, victories, enemiesDefeated } = req.body;
    const player = await Player.findByPk(req.params.id);

    if (player) {
      const updatedData = { username, bombs, bombsUsed, speed, victories, enemiesDefeated };

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

router.delete('/:id', async (req, res) => {
  try {
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