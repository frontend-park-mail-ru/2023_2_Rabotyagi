'use strict';
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOSTNAME_BACKEND = process.env.HOSTNAME_BACKEND || 'http://localhost:8080'
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', "public", 'index.html'));
});

app.listen(PORT, function () {
    console.log(`Server listening port ${PORT}`);
});
