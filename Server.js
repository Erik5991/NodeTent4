var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var db = require('./config/db');
var filmroutes_v1 = require('./api/film.routes.v1');
var auth_routes_v1 = require('./api/authentication.routes.v1');
var rentalroutes_v1 = require('./api/rental.routes.v1');
var config = require('./config/config');
var expressJWT = require('express-jwt');

var app = express();

app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(expressJWT({
    secret: config.secretkey
}).unless({
    path: [
        { url: '/api/v1/login', methods: ['POST'] },
        { url: '/api/v1/register', methods: ['POST'] },
        { url: '/api/v1/films', methods: ['GET'] }
    ]
}));

app.set('port', (process.env.PORT | config.webPort));
app.set('env', (process.env.ENV | 'development'));

app.use(logger('dev'));

app.use('/api/v1', auth_routes_v1);
app.use('/api/v1', filmroutes_v1);
app.use('/api/v1', rentalroutes_v1);

app.use(function(err, req, res, next) {
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    };
    res.status(401).send(error);
});

app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('De server luistert op port ' + app.get('port'));
});

module.exports = app;