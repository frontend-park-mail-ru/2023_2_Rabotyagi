'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');

const { NODE_ENV } = process.env;
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'static')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// app.listen(PORT, function () {
//     console.log(`Server listening port ${PORT}`);
// });

var httpServer, httpsServer

if (NODE_ENV === 'production') {
    try {
        var privateKey = fs.readFileSync('/etc/ssl/goods-galaxy.ru.key');
        var certificate = fs.readFileSync('/etc/ssl/goods-galaxy.ru.crt');
        var credentials = { key: privateKey, cert: certificate };

        httpsServer = https.createServer(credentials, app);
        httpsServer.listen(PORT+443);
        console.log(`HTTPS listening port ${PORT+443}`);
    }
    catch (err) {
        console.log(err);
    }
}
else {
    httpServer = http.createServer(app);
    httpServer.listen(PORT);
    console.log(`HTTP listening port ${PORT}`);
}