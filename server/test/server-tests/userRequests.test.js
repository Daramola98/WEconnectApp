import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../../app';
import db, { User } from '../../models';
import { userDetails, userDetails1 } from '../testData/userData';

const { expect } = chai;
// const { User } = db;
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
        .send(userDetails1)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User created succesfully');
          expect(res.body.createdUser.lastname).to.equal('Ajiboye');
          expect(res.body.createdUser.telephoneNumber).to.equal('07066455523');
          expect(res.body.createdUser.email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });

    it('catches validation errors', (done) => {
      const userDetails3 = {
        firstname: 'D',
        lastname: 'B',
        email: 'damilolaajiboye@live.com',
        password: 'dammyro100',
        confirmPassword: 'dammyro100',
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails3)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.validationErrors[0]).to.equal('Please provide a name with atleast 2 and not more than 50 characters');
          expect(res.body.validationErrors[1]).to.equal('lastname should be more than 2 and not greater than 50');
          done();
        });
    });
  });

  describe(`${baseEndpoint}/signUp`, () => {
    beforeEach((done) => {
      const userDetails4 = {
        firstname: 'Damilare',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@livea.com',
        password: 'dammyro1000',
        telephoneNumber: '07066445526',
        homeNumber: '08043553086',
      };
      User.create(userDetails4)
        .then(user => Promise.resolve(done()))
        .catch(err => Promise.reject(done(err)));
    });

    it('catches Email already exists', (done) => {
      const userDetails6 = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@livea.com',
        password: 'dammyro1000',
        confirmPassword: 'dammyro1000',
        telephoneNumber: '07066445526',
        homeNumber: '08043553086',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails6)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Email already exists');
          done();
        });
    });

    it('catches cases where password and confirmPassword fields dont match', (done) => {
      const userDetails6 = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@liveb.com',
        password: 'dammyro1000',
        confirmPassword: 'dammyro2000',
        telephoneNumber: '07066445526',
        homeNumber: '08043553086',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails6)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Passwords dont match');
          done();
        });
    });
    it('checks for required fields', (done) => {
      const userDetails6 = {
        firstname: '',
        lastname: '',
        email: 'damilolaajiboye@liveb.com',
        password: 'dammyro1000',
        confirmPassword: 'dammyro2000',
        telephoneNumber: '07066445526',
        homeNumber: '08043553086',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails6)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Firstname is required');
          expect(res.body.validationErrors[1]).to.equal('Firstname should be a valid string');
          expect(res.body.validationErrors[2]).to.equal('Lastname is required');
          expect(res.body.validationErrors[3]).to.equal('Lastname should be a valid string');
          expect(res.body.validationErrors[4]).to.equal('Passwords dont match');
          done();
        });
    });
  });

  describe(`${baseEndpoint}/login`, () => {
    beforeEach((done) => {
      User.create({
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@live.com',
        password: bcrypt.hashSync('dammyro1000', 10),
        telephoneNumber: '07066455523',
        homeNumber: '08043553081',
      })
        .then(user => Promise.resolve(done()))
        .catch(err => Promise.reject(done(err)));
    });

    it('Authenticates the user', (done) => {
      const userDetails7 = {
        email: 'damilolaajiboye@live.com',
        password: 'dammyro1000'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .send(userDetails7)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Authentication Successful');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('Authenticates the user with wrong details', (done) => {
      const userDetails8 = {
        email: 'damilolaaajiboye@live.com',
        password: 'dammyro12000'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .send(userDetails8)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Authentication failed');
          done();
        });
    });

    it('Authenticates the user with invalid token details', (done) => {
      const userDetails9 = {
        email: 'damilolaajiboye@live.com',
        password: 'dammyro1000'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .set('authorization', 'invalid')
        .send(userDetails9)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Token is invalid or has expired, update token');
          done();
        });
    });

    // it('Authenticates the user that is already logged in and returns a message', (done) => {
    //   const userDetails = {
    //     email: 'damilolaajiboye@live.com',
    //     password: 'dammyro1000'
    //   };
    //   chai.request(app)
    //     .post(`${baseEndpoint}/login`)
    //     .send(userDetails)
    //     .end((err, res) => {
    //       authToken1 = res.body.token;
    //     });
    //   chai.request(app)
    //     .post(`${baseEndpoint}/login`)
    //     .set('authorization', authToken1)
    //     .send(userDetails)
    //     .end((err, res) => {
    //       expect(res.status).to.equal(401);
    //       // expect(res.body.message).to.equal('You are already logged in');
    //       done();
    //     });
    // });

    it('catches wrong password', (done) => {
      const userDetails10 = {
        email: 'damilolaajiboye@live.com',
        password: 'aderfrefc10'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .send(userDetails10)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Authentication failed');
          done();
        });
    });
  });

  describe(`${baseEndpoint}/user`, () => {
    beforeEach((done) => {
      User.create({
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@live.com',
        password: bcrypt.hashSync('dammyro1000', 10),
        telephoneNumber: '07066455523',
        homeNumber: '08043553081',
      })
        .then((user) => {
          const userDetails11 = {
            email: 'damilolaajiboye@live.com',
            password: 'dammyro1000'
          };
          chai.request(app)
            .post(`${baseEndpoint}/login`)
            .send(userDetails11)
            .end((err, res) => {
              userToken = `Bearer ${res.body.token}`;
              return Promise.resolve(done());
            });
        })
        .catch(err => Promise.reject(done(err)));
    });

    it('updates the user profile details', (done) => {
      const updatedDetails = {
        email: 'damilolaajiboye@yahoo.com'
      };
      chai.request(app)
        .put(`${baseEndpoint}/user`)
        .send(updatedDetails)
        .set('authorization', userToken)
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
        .put(`${baseEndpoint}/user`)
        .send(updatedDetails)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Enter a Valid Email Address');
          done();
        });
    });
  });
});
