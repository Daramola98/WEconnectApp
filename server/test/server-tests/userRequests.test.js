import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../lib/app';
import db from '../../models/index';
import userData from '../testData/userData';

const { expect } = chai;
const { User } = db;
chai.use(chaiHttp);
let authToken1;
let userToken;
const baseEndpoint = '/api/v1/auth';

describe(`${baseEndpoint}`, () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => Promise.resolve(done()))
      .catch(err => Promise.reject(done(err)));
  });

  describe(`${baseEndpoint}/signUp`, () => {
    it('creates a user', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userData.userDetails1)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.userCreatedMessage).to.equal('User created succesfully');
          expect(res.body.registeredUserDetails.lastname).to.equal('Ajiboye');
          expect(res.body.registeredUserDetails.telephoneNumber).to.equal('07066455523');
          expect(res.body.registeredUserDetails.email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });

    it('catches validation errors', (done) => {
      const userDetails = {
        firstname: 'D',
        lastname: 'B',
        email: 'damilolaajiboyelive.com',
        password: 'dammyro100',
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.validationErrors[0]).to.equal('Please provide a name with atleast 5 and not more than 50 characters');
          expect(res.body.validationErrors[1]).to.equal('lastname should be more than 5 and not greater than 50');
          expect(res.body.validationErrors[2]).to.equal('Enter a valid Email Address');
          done();
        });
    });
  });

  describe(`${baseEndpoint}/signUp`, () => {
    beforeEach((done) => {
      const userDetails = {
        firstname: 'Damilare',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@livea.com',
        password: bcrypt.hashSync('dammyro1000', bcrypt.genSaltSync(10)),
        telephoneNumber: '07066445526',
        homeNumber: '08043553086',
      };
      User.create(userDetails)
        .then(user => Promise.resolve(done()))
        .catch(err => Promise.reject(done(err)));
    });

    it('catches exisiting user name', (done) => {
      const userDetails = {
        firstname: 'Damilare',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@livea.com',
        password: 'dammyro1000',
        telephoneNumber: '07066445526',
        homeNumber: '08043553086',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('User with first name and lastname already exists');
          done();
        });
    });

    it('catches Email already exists', (done) => {
      const userDetails = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@livea.com',
        password: 'dammyro1000',
        telephoneNumber: '07066445526',
        homeNumber: '08043553086',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Email already exists');
          done();
        });
    });
  });

  describe(`${baseEndpoint}/login`, () => {
    beforeEach((done) => {
      User.create(userData.userDetails)
        .then(user => Promise.resolve(done()))
        .catch(err => Promise.reject(done(err)));
    });

    it('Authenticates the user', (done) => {
      const userDetails = {
        email: 'damilolaajiboye@live.com',
        password: 'dammyro1000'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Authentication Successful');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('Authenticates the user with wrong details', (done) => {
      const userDetails = {
        email: 'damilolaaajiboye@live.com',
        password: 'dammyro12000'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Authentication failed');
          done();
        });
    });

    it('Authenticates the user with invalid token details', (done) => {
      const userDetails = {
        email: 'damilolaajiboye@live.com',
        password: 'dammyro1000'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .set('authorization', 'invalid')
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Token is invalid or has expired, update token');
          done();
        });
    });

    it('Authenticates the user that is already logged in and returns a message', (done) => {
      const userDetails = {
        email: 'damilolaajiboye@live.com',
        password: 'dammyro1000'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .send(userDetails)
        .end((err, res) => {
          authToken1 = res.body.token;
        });
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .set('authorization', `Bearer ${authToken1}`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          // expect(res.body.message).to.equal('You are already logged in');
          done();
        });
    });

    it('catches wrong password', (done) => {
      const userDetails = {
        email: 'damilolaajiboye@live.com',
        password: 'aderfrefc'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Authentication failed');
          done();
        });
    });
  });

  describe(`${baseEndpoint}/updateProfile`, () => {
    beforeEach((done) => {
      User.create(userData.userDetails)
        .then((user) => {
          const userDetails = {
            email: 'damilolaajiboye@live.com',
            password: 'dammyro1000'
          };
          chai.request(app)
            .post(`${baseEndpoint}/login`)
            .send(userDetails)
            .end((err, res) => {
              userToken = res.body.token;
            });
          return Promise.resolve(done());
        })
        .catch(err => Promise.reject(done(err)));
    });

    it('updates the user profile details', (done) => {
      const updatedDetails = {
        email: 'damilolaajiboye@yahoo.com'
      };
      chai.request(app)
        .put(`${baseEndpoint}/updateProfile`)
        .send(updatedDetails)
        .set('authorization', `Bearer ${authToken1}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.updatedUserDetails.email).to.equal('damilolaajiboye@yahoo.com');
          done();
        });
    });

    it('checks for validation errors', (done) => {
      const updatedDetails = {
        email: 'damilolaajiboyeyahoo.com'
      };
      chai.request(app)
        .put(`${baseEndpoint}/updateProfile`)
        .send(updatedDetails)
        .set('authorization', `Bearer ${authToken1}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Enter a valid Email Address');
          done();
        });
    });
  });
});
