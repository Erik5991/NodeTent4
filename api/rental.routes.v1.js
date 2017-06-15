var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/rentals/:userid', function(req, res) {
    var userID = req.params.userid;

    db.query('SELECT * FROM rental WHERE customer_id =?', [ userID ], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        }
    });
});

routes.post('/rentals/:userid/:inventoryid', function(req, res) {
    var userID = req.params.userid;
    var inventoryID = req.params.inventoryid;

    res.contentType('application/json');
    db.query('INSERT INTO `rental` (`rental_id`, `rental_date`, `inventory_id`, `customer_id`, `return_date`) VALUES (NULL, CURRENT_TIMESTAMP, ' + inventoryID +  ', ' + userID +  ', NULL)', function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        }
    });
});

routes.put('/rentals/:userid/:inventoryid', function(req, res) {
    var customerId = req.params.userid;
    var inventoryId = req.params.inventoryid;

    res.contentType('application/json');
    db.query('UPDATE rental SET return_date = CURRENT_TIMESTAMP WHERE customer_id = ' + customerId +' AND inventory_id = ' + inventoryId, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        }
    });
});

routes.delete('/rentals/:userid/:inventoryid', function(req, res) {
    var customerId = req.params.userid;
    var inventoryId = req.params.inventoryid;

    res.contentType('application/json');
    db.query('DELETE FROM rental WHERE customer_id = ' + customerId +' AND inventory_id = ' + inventoryId, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        }
    });
});

module.exports = routes;
