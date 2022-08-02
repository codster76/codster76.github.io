"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use('/api/items', require('./routes/api/itemRoutes.js')); // /api/items is the url everything will be accessible from
app.use(cors({ origin: 'https://hidden-atoll-35609.herokuapp.com/' }));
app.get('/', (req, res) => {
    res.send('asdgasdg');
});
app.get('/poop', (req, res) => {
    res.send('asdasfa');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
