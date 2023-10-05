'use strict'

const express = require('express');
const path = require('path');

const port = 3000
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'public')));
// app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});