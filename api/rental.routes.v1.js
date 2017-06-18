var express = require('express');
var routes = express.Router();
var db = require('../config/db');

//Geeft alle rentals terug van de user

routes.get('/rentals/:userid', function(req, res) {
    var userID = req.params.userid;

    db.query('SELECT rental.rental_date, rental.return_date, rental.inventory_id, film.title, film.rental_duration, film.rental_rate FROM rental INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id INNER JOIN film ON film.film_id = inventory.film_id WHERE customer_id =?', [ userID ], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({"result": rows});
        }
    });
});

//Maakt een nieuwe rental aan voor de user van de meegegeven inventory id

routes.post('/rentals/:userid/:inventoryid', function(req, res) {
    var userID = req.params.userid;
    var inventoryID = req.params.inventoryid;

    res.contentType('application/json');
    db.query('INSERT INTO `rental` (`rental_id`, `rental_date`, `inventory_id`, `customer_id`, `return_date`) VALUES (NULL, CURRENT_TIMESTAMP, ' + inventoryID +  ', ' + userID +  ', NULL)', function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({"result": rows});
        }
    });
});

//Past de rental aan van de mmegegeven user en inventory id. De rental wordt hiermee gestopt, de return_date wordt op CURRENT_TIMESTAMP gezet.

routes.put('/rentals/:userid/:inventoryid', function(req, res) {
    var customerId = req.params.userid;
    var inventoryId = req.params.inventoryid;

    res.contentType('application/json');
    db.query('UPDATE rental SET return_date = CURRENT_TIMESTAMP WHERE customer_id = ' + customerId +' AND inventory_id = ' + inventoryId, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({"result": rows});
        }
    });
});

//Een rental wordt volledig verwijderd van de meegegeven user en inventory id.

routes.delete('/rentals/:userid/:inventoryid', function(req, res) {
    var customerId = req.params.userid;
    var inventoryId = req.params.inventoryid;

    res.contentType('application/json');
    db.query('DELETE FROM rental WHERE customer_id = ' + customerId +' AND inventory_id = ' + inventoryId, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({"result": rows});
        }
    });
});

module.exports = routes;
