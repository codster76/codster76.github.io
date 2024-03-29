"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Only allow requests from localhost:3000
app.use('/api/items', require('./routes/api/itemRoutes.js')); // /api/items is the url everything will be accessible from
app.get('/', (req, res) => {
    res.send('asdgasdg');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
