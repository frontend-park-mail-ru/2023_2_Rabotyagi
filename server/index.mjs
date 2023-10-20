'use strict';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
// const re = /^\/(?!api.+)(.+)$/;
// This configures a request mocking server with the given request handlers.

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, function () {
    console.log(`Server listening port ${PORT}`);
});