"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
app.use(express.json());
app.use('/api/items', require('./routes/api/itemRoutes.js')); // /api/items is the url everything will be accessible from
app.get('/', (req, res) => {
    res.send('asdgasdg');
});
app.get('/poop', (req, res) => {
    res.send('asdasfa');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
