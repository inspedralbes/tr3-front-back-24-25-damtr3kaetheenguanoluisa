import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { spawn } from 'child_process';
import userRoutes from './routes/users.js';
import playerRoutes from './routes/players.js';
import sequelize from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3020;
// const PORT_PROD = process.env.PORT_PROD 


app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connectat a MongoDB'))
.catch((err) => console.error('Error al connectar a MongoDB', err));

app.use('/users', userRoutes);
app.use('/players', playerRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Benvingut al back!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

const mongoService = { state: "stopped", process: null };

app.use("/mongo-service", (req, res) => {
  let message = "Servei MongoDB iniciat";

  if (mongoService.state === "stopped") {
    console.log("Iniciant el servei de MongoDB...");
    startMongoService();
    mongoService.state = "started";
  } else {
    console.log("Parant el servei de MongoDB...");
    stopMongoService();
    mongoService.state = "stopped";
    message = "Servei de MongoDB detingut";
  }

  res.send({ message });
});

function startMongoService() {
  const microservicePath = path.resolve(__dirname, 'microserveis/mongoDB/index.js');
  const process = spawn('node', [microservicePath]);

  mongoService.process = process;

  process.stdout.on('data', data => {
    console.log("Mongo Service log: ", data.toString());
  });

  process.stderr.on('data', data => {
    console.error("Mongo Service error: ", data.toString());
  });

  process.on('close', code => {
    console.log(`Mongo Service stopped with code ${code}`);
    mongoService.state = "stopped";
    mongoService.process = null;
  });
}
startMongoService();

function stopMongoService() {
  if (mongoService.process) {
    mongoService.process.kill();
    mongoService.process = null;
  }
}

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error sincronizando la base de datos:', err));