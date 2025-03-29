// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, '../../../back/.env') });

// const app = express();
// app.use(cors());
// app.use(express.json());

// const port = process.env.PORT_MONGO;

// const logSchema = new mongoose.Schema({
//   microservei: { type: String, required: true },
//   message: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const Log = mongoose.model('Log', logSchema);

// async function logMessage(microservei, message) {
//   try {
//     const log = new Log({ microservei, message });
//     await log.save();
//   } catch (err) {
//     console.error('Error en guardar el log:', err);
//   }
// }

// async function getLogs(microservei) {
//   try {
//     const logs = await Log.find({ microservei }).sort({ timestamp: -1 });
//     return logs;
//   } catch (err) {
//     console.error('Error en obtenir els logs:', err);
//     return [];
//   }
// }

// process.on('message', async (message) => {
//   if (message.action === 'start') {
//     app.listen(port, () => {
//       console.log(`Servei de MongoDB corrent a ${port}`);
//     }).on('error', (err) => {
//       if (err.code === 'EADDRINUSE') {
//         console.log(`El port ${port} ja està en ús, però el servidor està funcionant.`);
//       } else {
//         console.error(err);
//       }
//     });
//     mongoose.connect(process.env.MONGO_CLUSTER)
//       .then(() => console.log("Connectat a MongoDB"))
//       .catch(err => console.error('Error en connectar a MongoDB Atlas:', err));
//   }
//   if (message.action === 'stop') {
//     process.send('exit');
//     process.exit();
//   }
//   if (message.action === 'getLog') {
//     const logs = await getLogs(message.servei);
//     const simplifiedLogs = logs.map(log => ({
//       message: log.message,
//       timestamp: log.timestamp
//     }));
//     process.send({ logs: simplifiedLogs });
//   }
//   if (message.action === 'encendreLog') {
//     await logMessage(message.servei, `Microservei de ${message.servei} encés.`);
//   }
//   if (message.action === 'apagarLog') {
//     await logMessage(message.servei, `Microservei de ${message.servei} apagat.`);
//   }
// });