//
// ./api/authentication.routes.v1.js
//
//
// ./api/routes_v2.js
//
var express = require('express');
var router = express.Router();
var db = require('../config/db');
var auth = require('../auth/authentication');

var mijnObject = {
    message: 'Hello World Versie Twee!',
};

// Deze route is de 'preprocessor'.
// Hier gaan we later bv. testen of de gebruiker
// ingelogd is.
// next() zorgt ervoor dat we 'doorvallen' naar de volgende URL.
router.get('*', function(req, res, next){
    // console.log('aangeroepen.');
    next();
});

router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    if(username == "prog4" && password == "geheim"){
        var token = auth.encodeToken(username);
        res.contentType('application/json');
        res.status(200);
        res.json({
            token: token
        });}
    else {res.contentType('application/json');
        res.status(401);
        res.json({
            error: 'ongeldige username of password.'})

    }
});

router.get('/goodbye', function(req, res){
    res.contentType('application/json');
    res.status(200);
    res.json({ 'tekst': 'Goodbye Versie 2!'});
});

// Hiermee maken we onze router zichtbaar voor andere bestanden.
module.exports = router;