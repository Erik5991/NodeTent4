var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/rental/:id', function(req, res) {

    var rentalID = req.params.id;

    res.contentType('application/json');

    db.query('SELECT * FROM rental WHERE rental_id =?', [ rentalID ], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});