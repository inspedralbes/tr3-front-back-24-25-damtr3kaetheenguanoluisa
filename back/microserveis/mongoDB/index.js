import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT_MONGO;

app.use(cors());
app.use(express.json());

const bombesSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  player1Name: { type: String, required: true },
  player2Name: { type: String, required: true },
  player1Bombs: { type: Number, required: true, default: 0 },
  player2Bombs: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, default: Date.now } 
}, { 
  versionKey: false 
});

const enemicsEliminatsSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  player1Name: { type: String, required: true },
  player2Name: { type: String, required: true },
  player1Enemy: { type: Number, required: true, default: 0 },
  player2Enemy: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, default: Date.now }
}, { 
  versionKey: false 
});

const Bombes = mongoose.model('Bombes', bombesSchema);
const EnemicsEliminats = mongoose.model('EnemicsEliminats', enemicsEliminatsSchema);


console.log('Intentando conectar a MongoDB en:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
})
.then(() => {
  console.log('Microservei: Conectat a MongoDB correctament');
})
.catch(err => {
  console.error('Error al conectar a MongoDB:', err);
  process.exit(1);
});

app.post('/bombes', async (req, res) => {
  try {
    console.log('Microservei: Rebut petició POST /bombes:', req.body);
    
    const { gameId, player1Name, player2Name, player1Bombs, player2Bombs } = req.body;

    if (!gameId || !player1Name || !player2Name) {
      throw new Error('gameId, player1Name y player2Name son obligatoris');
    }

    if (typeof player1Bombs !== 'number' || typeof player2Bombs !== 'number') {
      throw new Error('player1Bombs i player2Bombs han ser números');
    }

    const bombes = new Bombes({
      gameId,
      player1Name,
      player2Name,
      player1Bombs,
      player2Bombs
    });
    
    await bombes.save();
    console.log('Microservei: Bombes guardades correctament:', bombes);
    res.status(201).json({ message: 'Bombes guardades', data: bombes });
  } catch (error) {
    console.error('Microservei: Error al guardar bombes:', error);
    res.status(400).json({ error: error.message });
  }
});


app.get('/bombes', async (req, res) => {
  try {
    const bombes = await Bombes.find();
    res.json(bombes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/enemics', async (req, res) => {
  try {
    console.log('Microservei: Rebut petició POST /enemics:', req.body);
    
    const { gameId, player1Name, player2Name, player1Enemy, player2Enemy } = req.body;

    if (!gameId || !player1Name || !player2Name) {
      throw new Error('gameId, player1Name i player2Name son obligatoris');
    }

    if (typeof player1Enemy !== 'number' || typeof player2Enemy !== 'number') {
      throw new Error('player1Enemy y player2Enemy han de ser números');
    }

    const enemics = new EnemicsEliminats({
      gameId,
      player1Name,
      player2Name,
      player1Enemy,
      player2Enemy
    });
    
    await enemics.save();
    console.log('Microservei: Enemics guardats correctament:', enemics);
    res.status(201).json({ message: 'Enemics eliminats guardats', data: enemics });
  } catch (error) {
    console.error('Microservei: Error al guardar enemics:', error);
    res.status(400).json({ error: error.message });
  }
});


app.get('/enemics', async (req, res) => {
  try {
    const enemics = await EnemicsEliminats.find();
    res.json(enemics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/stats', async (req, res) => {
    try {
      const bombesStats = await Bombes.aggregate([
        {
          $group: {
            _id: null,
            totalPlayer1Bombs: { $sum: "$player1Bombs" },
            totalPlayer2Bombs: { $sum: "$player2Bombs" },
            avgPlayer1Bombs: { $avg: "$player1Bombs" },
            avgPlayer2Bombs: { $avg: "$player2Bombs" },
            maxPlayer1Bombs: { $max: "$player1Bombs" },
            maxPlayer2Bombs: { $max: "$player2Bombs" },
          }
        }
      ]);
  
      const enemicsStats = await EnemicsEliminats.aggregate([
        {
          $group: {
            _id: null,
            totalPlayer1Enemy: { $sum: "$player1Enemy" },
            totalPlayer2Enemy: { $sum: "$player2Enemy" },
            avgPlayer1Enemy: { $avg: "$player1Enemy" },
            avgPlayer2Enemy: { $avg: "$player2Enemy" },
            maxPlayer1Enemy: { $max: "$player1Enemy" },
            maxPlayer2Enemy: { $max: "$player2Enemy" },
          }
        }
      ]);
  
      res.json({
        bombes: bombesStats[0] || {},
        enemics: enemicsStats[0] || {}
      });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ error: error.message });
    }
  });
  

app.listen(port, () => {
  console.log(`Microservei MongoDB escoltant en el port ${port}`);
});
