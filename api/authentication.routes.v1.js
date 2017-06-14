var express = require('express');
var router = express.Router();
var db = require('../config/db');
var auth = require('../auth/authentication');

router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    if(username != '' || password != ''){
        db.query("SELECT password FROM customer WHERE email = '" + username + "'", function (error, result, fields) {
            if (error != null) {
                res.status(400).json(error);
            } else {
                if (result.length !== null) {
                    if (result[0].password == password) {
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
                else {
                    res.status(200).json(result)
                }
            }
        })
    }
});

module.exports = router;