var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')();
var expressSession = require('express-session');
// var allowCors = require('./cors');
var app = express();

//permitir codificação url
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
//app.use(bodyParser.json());
app.use(expressValidator);
// app.use(allowCors)

app.use(expressSession({
    secret: 'xpto', //chave de segurança
    resave: true, //regravada no servidor
    saveUninitialized: false, //sera regravada se for modificada,
    cookie: {
        secure: false,
    }
}));

app.use(express.static('./app/public'));

//autoload dos arquivos de rotas e conexao
consign()
    .include('src/resources')
    // .then('config/mongodb.js')
    // .then('app/models')
    // .then('app/controllers')
    .into(app)

module.exports = app;