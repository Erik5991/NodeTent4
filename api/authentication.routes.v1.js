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

router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    if(username != '' || password != ''){
        db.query("SELECT COUNT(*) AS count, customer_id FROM customer WHERE email = '" + username + "' AND password = '" + password + "'", function (error, result) {
            if (error) {
                res.status(400).json(error);
            } else {
                if(result[0].count >= 1){
                    var token = auth.encodeToken(username);
                    var id = result[0].customer_id;
                    res.status(200).json({
                        "token": token,
                        "id": id
                    });
                }
                else {
                    res.status(401).json({
                        "error": "verkeerde gegevens"
                    })
                }
            }
        })
    }
});

router.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;

    if(username != '' || password != '' || firstname != '' || lastname !=''){
       db.query("INSERT INTO `customer` (`customer_id`, `first_name`, `last_name`, `password`, `email`) VALUES (NULL, '" + firstname + "', '" + lastname +"', '"+ password +"', '"+ username +"');", function (error, result) {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({
                    "status": "geslaaagd",
                });
            }
        })
    }
});


module.exports = router;