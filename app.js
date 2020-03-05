var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var https = require('https');
var fs = require('fs');
var privateKey = fs.readFileSync('./sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.cert', 'utf8');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var credentials = {key: privateKey, cert:certificate};
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8000);

module.exports = app;
