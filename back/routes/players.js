import express from 'express';
import path from 'path';
import path from 'path';
import bcrypt from 'bcryptjs';
import { Player } from '../models/index.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const router = express.Router();

const MONGO_SERVICE_URL = process.env.MONGO_SERVICE_URL; 

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
    let { gameId, players } = req.body;

    // 🔹 Verificar si players tiene al menos dos jugadores
    if (!Array.isArray(players) || players.length < 2) {
        console.error("❌ Error: Se requieren al menos 2 jugadores.");
        return res.status(400).json({ success: false, message: "Se requieren al menos 2 jugadores." });
    }

    // 🔹 Asegurarse que gameId esté definido
    if (!gameId) {
        gameId = uuidv4();
        console.log(`✅ Nuevo gameId generado: ${gameId}`);
    }

    // 🔹 Extraer jugadores de manera segura
    const player1 = players[0] || {};
    const player2 = players[1] || {};

    // 🔹 Log para verificar cómo se ven los datos de los jugadores
    console.log("Jugadores recibidos:", players);
    console.log("Jugador 1:", player1);
    console.log("Jugador 2:", player2);

    const player1Name = player1.username?.trim() || null;
    const player2Name = player2.username?.trim() || null;

    // 🔹 Verificar si los nombres de los jugadores son válidos
    if (!player1Name || !player2Name) {
        console.error("❌ Error: Ambos jugadores deben tener un nombre válido.");
        return res.status(400).json({ success: false, message: "Ambos jugadores deben tener un nombre válido." });
    }

    console.log(`👤 Jugador 1: ${player1Name}, Jugador 2: ${player2Name}`);

    // 🔹 Actualizar jugadores en la base de datos SQL
    for (const player of players) {
        const dbPlayer = await Player.findByPk(player.id);
        if (dbPlayer) {
            await dbPlayer.update({
                bombAmount: player.bombAmount ?? 0,
                bombsUsed: player.bombsUsed ?? 0,
                speed: player.speed ?? 0,
                victories: player.victories ?? 0,
                enemiesDefeated: player.enemiesDefeated ?? 0
            });
        }
    }

    // 🔹 Enviar estadísticas a MongoDB
    try {
        const [bombesResponse, enemicsResponse] = await Promise.all([
            fetch(`${MONGO_SERVICE_URL}/bombes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gameId,
                    player1Name,
                    player2Name,
                    player1Bombs: parseInt(player1.bombsUsed) || 0,
                    player2Bombs: parseInt(player2.bombsUsed) || 0
                })
            }),
            fetch(`${MONGO_SERVICE_URL}/enemics`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gameId,
                    player1Name,
                    player2Name,
                    player1Enemy: parseInt(player1.enemiesDefeated) || 0,
                    player2Enemy: parseInt(player2.enemiesDefeated) || 0
                })
            })
        ]);

        if (!bombesResponse.ok || !enemicsResponse.ok) {
            throw new Error('Error al guardar estadísticas en MongoDB');
        }

        console.log('✅ Estadísticas guardadas correctamente en MongoDB');
    } catch (mongoError) {
        console.error('❌ Error al enviar datos al microservicio MongoDB:', mongoError);
    }

    return res.json({
        success: true,
        message: "✅ Stats actualizadas correctamente"
    });
  } catch (error) {
    console.error('Error en updateUsers:', error);
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