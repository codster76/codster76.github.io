"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const data = require('./items.json');
const app = express();
app.get('/', (req, res) => {
    res.send('butts');
});
app.get('/poop', (req, res) => {
    res.send('asdasfa');
});
app.get('/api/items', (req, res) => {
    res.send(data);
});
app.get('/api/items/:name', (req, res) => {
    res.send(data.filter((item) => {
        if (item.name === req.params) {
            return item;
        }
    }));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
