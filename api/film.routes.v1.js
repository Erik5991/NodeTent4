var express = require('express');
var routes = express.Router();
var db = require('../config/db');

routes.get('/films/:id', function(req, res) {
    var filmID = req.params.id;

    //Geeft de informatie van de film door en geeft alle alle inventory id's mee van de films de versies die nog niet uit zijn geleend

    db.query('SELECT inventory.inventory_id, film.title, film.description, film.release_year, film.rental_duration, film.rental_rate, film.length, film.replacement_cost, film.rating, film.special_features FROM film INNER JOIN inventory on film.film_id = inventory.film_id left JOIN view_rental_out on view_rental_out.inventory_id = inventory.inventory_id  WHERE film.film_id = ? AND view_rental_out.inventory_id IS NULL', [ filmID ], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({"result": rows});
        }
    });
});

//Geeft alle informatie terug van alle films, je kan een offset en een limit meesturen. Zonder deze mee te sturen wordt als standaard 0 voor de offset gedaan (dus begint bij de eerste te kijken) en 100 als als limit (dus dat je nite duizenden resultaten terugkrijgt)

routes.get('/films', function (req, res) {
    var offset = req.query.offset || 0;
    var limit = req.query.count || 100;

    db.query('SELECT * FROM film LIMIT ' + limit + ' OFFSET ' + offset, function (error, rows, fields) {
        if(error){
            res.status(401).json(error);
        }
        else {
            res.status(200).json({"result": rows});
        }
    })
});

module.exports = routes;