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
const port = process.env.PORT_MONGO ;

app.use(cors());
app.use(express.json());

const bombesSchema = new mongoose.Schema({
  player1Bombs: { type: Number, required: true },
  player2Bombs: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const enemicsEliminatsSchema = new mongoose.Schema({
  player1Enemy: { type: Number, required: true },
  player2Enemy: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Bombes = mongoose.model('Bombes', bombesSchema);
const EnemicsEliminats = mongoose.model('EnemicsEliminats', enemicsEliminatsSchema);


app.post('/bombes', async (req, res) => {
  try {
    const bombes = new Bombes(req.body);
    await bombes.save();
    res.status(201).json({ message: 'Bombes guardades', data: bombes });
  } catch (error) {
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
    const enemic = new EnemicsEliminats(req.body);
    await enemic.save();
    res.status(201).json({ message: 'Enemics guardats', data: enemic });
  } catch (error) {
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
