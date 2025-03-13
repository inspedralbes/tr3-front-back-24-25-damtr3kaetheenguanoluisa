const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connectat a MongoDB'))
.catch((err) => console.error('Error al connectar a MongoDB', err));

app.get('/', (req, res) => {
    res.json('Benvingut al back');
});

app.listen(PORT, () => {
    console.log(`Servidor corrent al port ${PORT}`);
});