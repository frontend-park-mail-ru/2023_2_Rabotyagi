'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');

const { NODE_ENV } = process.env;
var app;

if (NODE_ENV === 'production') {
    var privateKey = fs.readFileSync('/etc/ssl/goods-galaxy.ru.key');
    var certificate = fs.readFileSync('/etc/ssl/goods-galaxy.ru.crt');
    
    var credentials = { key: privateKey, cert: certificate };
    
    app = express.createServer(credentials);
}
else {
    app = express();
}

const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'static')));

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, function () {
    console.log(`Server listening port ${PORT}`);
});
