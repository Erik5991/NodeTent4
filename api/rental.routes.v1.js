var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/rentals/:id', function(req, res) {

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



routes.post('/rentals/insert', function(req, res) {

    var rentals = req.body;
    var inventory = req.body;
    var query = {
        sql: 'INSERT INTO `rental`(`rental_id`, `inventory_id`) VALUES (?, ?)',
        values: [rentals.rental_id, inventory.inventory_id],
        timeout: 2000 // 2secs
    };


    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});



module.exports = routes;
