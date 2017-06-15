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


    var query = {
        sql: 'INSERT INTO `rental` (`rental_id`, `rental_date`, `inventory_id`, `customer_id`, `return_date`) VALUES (NULL, CURRENT_TIMESTAMP, 2, 2, NULL)',

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

routes.put('/rentals/change/:id/:invID', function(req, res) {

    var todos = req.body;
    var customerId = req.params.id;
    var inventoryId = req.params.invID;
    var query = {
        sql: "UPDATE `rental`  ()",
        values: [todos.Title, todos.Beschrijving, ID],
        timeout: 2000 // 2secs
    };

    console.dir(todos);
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


routes.delete('/rentals/delete/:id', function(req, res) {

    var ID = req.params.id;
    var query = {
        sql: 'DELETE FROM `rental` WHERE inventory_id=?',
        values: [ID],
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
