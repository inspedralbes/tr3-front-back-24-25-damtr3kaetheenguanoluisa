const express = require('express');
const cors = require('cors');
const PORT = require('PORT');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.json('Benvingut al back');
});

app.listen(PORT, () => {
    console.log(`Servidor corrent al port ${PORT}`);
});