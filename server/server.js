'use strict';
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOSTNAME_BACKEND = process.env.HOSTNAME_BACKEND || 'http://localhost:8080'
const app = express();


app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));

app.get('src/shared/constants/api.mjs', (req, res) => {
    console.log(res);
    res.render('api', {HOSTNAME_BACKEND: HOSTNAME_BACKEND});
});

app.listen(PORT, function () {
    console.log(`Server listening port ${PORT}`);
});
