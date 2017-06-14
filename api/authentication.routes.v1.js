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
    var dbemail;

    if(username != '' || password != ''){
        db.query("SELECT COUNT(*) AS count FROM customer WHERE email = '" + username + "' AND password = '" + password + "'", function (error, result) {
            if (error) {
                res.status(400).json(error);
            } else {
                if(result[0].count >= 1){
                    var token = auth.encodeToken(username);
                    res.status(200).json({
                        "token": token
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

module.exports = router;