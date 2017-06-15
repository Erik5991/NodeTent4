var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/films/:id', function(req, res) {
    var filmID = req.params.id;

    db.query('SELECT * FROM film WHERE film_id =?', [ filmID ], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        }
    });
});


routes.get('/films', function (req, res) {
    var offset = req.query.offset || 0;
    var limit = req.query.count || 100;

    db.query('SELECT * FROM film LIMIT ' + limit + ' OFFSET ' + offset, function (error, rows, fields) {
        if(error){
            res.status(401).json(error);
        }
        else {
            res.status(200).json(rows);
        }
    })
});

module.exports = routes;