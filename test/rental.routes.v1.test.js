process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var server = require('../server');
var chould = chai.should();

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTgwNDg2MjAsImlhdCI6MTQ5Nzg3NTgyMCwic3ViIjoidGVzdEBhdmFucy5ubCJ9.ZIX-hCUbEeVAWmFW86Fx_3HkcnSaYxvEheuOK55Ms00";
var userid = 2;
var inventoryid = 101;


chai.use(chaiHttp);

describe('GET /api/v1/rental/:userid', function() {

    it('should return all films when logged in', function(done) {
        chai.request(server)
            .get('/api/v1/rentals/' + userid)
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                res.body.result[0].should.have.property('inventory_id');
                res.body.result[0].should.have.property('title');
                res.body.result[0].should.have.property('rental_duration');
                done();
            });
    });

    it('should return no films with a user that does not exist', function(done) {
        chai.request(server)
            .get('/api/v1/rentals/9999')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                res.body.result.should.have.length(0);
                done();
            });
    });

});

describe('POST /api/v1/rentals/:userid/:inventoryid', function() {

    it('should remove a rental on a valid ID', function(done) {
        chai.request(server)
            .post('/api/v1/rentals/' + userid + '/' + inventoryid)
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('String');
                res.body.result.should.have.lengthOf(8);
                done();
            });
    });

    it('should return empty array on invalid ID', function(done) {
        chai.request(server)
            .post('/api/v1/rentals/' + 500 + '/' + inventoryid)
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(401);
                done();
            });
    });
});

describe('PUT /api/v1/rentals/:userid/:invid', function() {

    it('should update a rental', function (done) {
        chai.request(server)
            .put('/api/v1/rentals/' + userid + '/' + inventoryid)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('String');
                res.body.result.should.have.lengthOf(8);
                done();
            });
    });

    it('should NOT update a rental', function (done) {
        chai.request(server)
            .put('/api/v1/rentals/' + 222222 + '/ ' + 36337)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    })
});

describe('Detelet /api/v1/rentals/:userid/:invid', function() {

    it('should delete a rental', function (done) {
        chai.request(server)
            .delete('/api/v1/rentals/' + userid + '/' + inventoryid)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('String');
                res.body.result.should.have.lengthOf(8);
                done();
            });
    });

    it('should NOT delete a rental', function (done) {
        chai.request(server)
            .delete('/api/v1/rentals/' + 222222 + '/ ' + 36337)
            .set('Authorization', 'Bearer ' + token)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    })
});