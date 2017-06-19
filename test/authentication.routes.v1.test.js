process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('Auth API v1', function() {

    it('Unautherized error bij rentals ophalen', function(done) {
        chai.request(server)
            .get('/api/v1/rentals/1')
            .end(function(err, res) {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').equal('No authorization token was found');
                res.body.should.have.property('name').equal('UnauthorizedError');
                done();
            });
    });

    it('error op post met verkeerde inloggegevens', function(done) {
        var user = {
            username: "invalid",
            password: "geheim"
        }
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('error').that.is.a('string');
                res.body.error.should.equal('verkeerde gegevens');
                done();
            });
    });

    it('Token teruggeven bij het inloggen met goede gegevens', function(done) {
        var user = {
            username: "test@avans.nl",
            password: "geheim"
        }
        chai.request(server)
            .post('/api/v1/login')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('token').that.is.a('string');
                done();
            });
    });

});