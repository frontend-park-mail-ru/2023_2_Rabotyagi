const express = require('express');
const path = require('path');

const port = 3000
const publicDir = 'public'

const app = express();

app.use(express.static(path.join(__dirname, publicDir)))

app.get('/', (req, res) => {
    res.send({ message: 'Hello WWW!' });
});

app.listen(port, () => {
    console.log('Application listening on port ', port, '!');
});