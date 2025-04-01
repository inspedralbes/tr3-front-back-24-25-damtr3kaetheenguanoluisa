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
  player1Bombs: { type: Number, required: true },
  player2Bombs: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
}, { 
  versionKey: false 
});

const enemicsEliminatsSchema = new mongoose.Schema({
  player1Enemy: { type: Number, required: true, default: 0 },
  player2Enemy: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, default: Date.now }
}, { 
  versionKey: false 
});

const Bombes = mongoose.model('Bombes', bombesSchema);
const EnemicsEliminats = mongoose.model('EnemicsEliminats', enemicsEliminatsSchema);

// Configuración de MongoDB
console.log('Intentando conectar a MongoDB con URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})
.then(() => {
  console.log('Microservei: Conectat a MongoDB Atlas correctament');
})
.catch(err => {
  console.error('Error detallado de MongoDB:', err.message);
  if (err.codeName) {
    console.error('Código de error:', err.code, 'Nombre del código:', err.codeName);
  }
  process.exit(1);
});

app.post('/bombes', async (req, res) => {
  try {
    console.log('Microservei: Rebut petició POST /bombes:', req.body);
    
    const { player1Bombs, player2Bombs } = req.body;
    if (typeof player1Bombs !== 'number' || typeof player2Bombs !== 'number') {
      throw new Error('player1Bombs y player2Bombs deben ser números');
    }

    const bombes = new Bombes({
      player1Bombs: player1Bombs,
      player2Bombs: player2Bombs
    });
    
    await bombes.save();
    console.log('Microservei: Bombes guardades correctament:', bombes);
    res.status(201).json({ message: 'Bombas guardadas', data: bombes });
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
    
    const { player1Enemy, player2Enemy } = req.body;
    if (typeof player1Enemy !== 'number' || typeof player2Enemy !== 'number') {
      throw new Error('player1Enemy y player2Enemy deben ser números');
    }

    const enemics = new EnemicsEliminats({
      player1Enemy: player1Enemy,
      player2Enemy: player2Enemy
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

app.listen(port, () => {
  console.log(`Microservei MongoDB escoltant en el port ${port}`);
});
