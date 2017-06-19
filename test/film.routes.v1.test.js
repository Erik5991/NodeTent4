process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var server = require('../server');
var chould = chai.should();

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTgwNDg2MjAsImlhdCI6MTQ5Nzg3NTgyMCwic3ViIjoidGVzdEBhdmFucy5ubCJ9.ZIX-hCUbEeVAWmFW86Fx_3HkcnSaYxvEheuOK55Ms00";

chai.use(chaiHttp);

describe('GET /api/v1/films', function() {

    it('should return all films when logged in', function(done) {
        chai.request(server)
            .get('/api/v1/films?count=10')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                res.body.result[0].should.have.property('film_id');
                res.body.result.should.have.lengthOf(10);
                done();
            });
    });
});

describe('GET /api/v1/films/:filmid', function() {

    it('should return a single Film on a valid ID', function(done) {
        var filmID = 1;
        chai.request(server)
            .get('/api/v1/films/' + filmID)
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                res.body.result.should.have.lengthOf(1);
                res.body.result[0].should.have.property('film_id').equal(filmID);
                res.body.result[0].should.have.property('title').that.is.a('string');
                res.body.result[0].should.have.property('description').that.is.a('string');
                done();
            });
    });

    it('should return empty array on invalid ID', function(done) {
        var filmID = 99999;
        chai.request(server)
            .get('/api/v1/films/' + filmID)
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('result').that.is.an('array');
                res.body.result.should.have.lengthOf(0);
                done();
            });
    });
});
