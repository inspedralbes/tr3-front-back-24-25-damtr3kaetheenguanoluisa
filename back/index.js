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
import logRoutes from './routes/logs.js';
import Log from './models/log.js';
import sequelize from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
let server = null;
let isShuttingDown = false;

app.use(express.json());
app.use(cors({
  // origin: ['https://dam.inspedralbes.cat'],
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Función para cerrar el servidor
async function closeServer() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  try {
    if (server) {
      await new Promise((resolve) => {
        server.close(() => {
          console.log('Servidor HTTP cerrado.');
          resolve();
        });
      });
    }

    await mongoose.connection.close();
    console.log('Conexión MongoDB cerrada.');
    process.exit(0);
  } catch (error) {
    console.error('Error al cerrar el servidor:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', () => {
  console.log('Recibida señal SIGTERM, cerrando servidor...');
  closeServer();
});

process.on('SIGINT', () => {
  console.log('Recibida señal SIGINT, cerrando servidor...');
  closeServer();
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connectat a MongoDB');
})
.catch((err) => {
  console.error('Error al connectar a MongoDB', err);
});

app.use('/users', userRoutes);
app.use('/players', playerRoutes);
app.use('/logs', logRoutes);

async function createLog(service, message, type = 'info') {
  try {
    const log = new Log({
      service,
      message,
      type
    });
    await log.save();
  } catch (error) {
    console.error('Error al guardar log:', error);
  }
}

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
    createLog('MongoDB', 'Servicio MongoDB iniciado', 'info');
  } else {
    console.log("Parant el servei de MongoDB...");
    stopMongoService();
    mongoService.state = "stopped";
    message = "Servei de MongoDB detingut";
    createLog('MongoDB', 'Servicio MongoDB detenido', 'info');
  }

  res.send({ message });
});

function startMongoService() {
  if (mongoService.process) {
    console.log("El servicio MongoDB ya está en ejecución");
    return;
  }

  const microservicePath = path.resolve(__dirname, 'microserveis/mongoDB/index.js');
  const process = spawn('node', [microservicePath]);

  mongoService.process = process;

  process.stdout.on('data', data => {
    console.log("Mongo Service log: ", data.toString());
    createLog('MongoDB', data.toString(), 'info');
  });

  process.stderr.on('data', data => {
    console.error("Mongo Service error: ", data.toString());
    createLog('MongoDB', data.toString(), 'error');
  });

  process.on('close', code => {
    console.log(`Mongo Service stopped with code ${code}`);
    createLog('MongoDB', `Servicio detenido con código ${code}`, code === 0 ? 'info' : 'error');
    mongoService.state = "stopped";
    mongoService.process = null;
  });
}

function stopMongoService() {
  if (mongoService.process) {
    mongoService.process.kill();
    mongoService.process = null;
  }
}

const startServer = () => {
  if (isShuttingDown) return;

  try {
    server = app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${PORT} está en uso. Intentando de nuevo en 5 segundos...`);
        setTimeout(startServer, 5000);
      } else {
        console.error('Error al iniciar el servidor:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
    startServer();
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
    process.exit(1);
  });