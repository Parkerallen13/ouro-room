// ouro-backend/api/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ouro backend is live from Vercel!');
});


module.exports = app;