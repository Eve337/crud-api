import { ENDPOINT_USERS } from './../types/types';
import chai from 'chai';
import { server } from '../../index';
import chaiHttp from 'chai-http';

const expect = chai.expect;
let userId: string = '';
chai.use(chaiHttp)

describe('API tests', () => {
  it('[get] request should return empty array', (done) => {
    chai.request(server)
    .get(ENDPOINT_USERS)
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('[post] request should return 201 response and new entity', function(done) {
    chai.request(server)
      .post(ENDPOINT_USERS)
      .send({"username":"hehe", "age": 5, "hobbies": []})
      .end(function(err, res) {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
        expect(res.body).to.have.property("age");
        expect(res.body).to.have.property("hobbies");
        userId = res.body.id;
      });
      done();
  });

  it('[get]/id request should return user object', function(done) {
    chai.request(server)
      .get(ENDPOINT_USERS + '/' + userId)
      .end(function(err, res) {
        console.log(userId);
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
        expect(res.body).to.have.property("age");
        expect(res.body).to.have.property("hobbies");
        console.log(res.body);
      });
      done();
  });
});