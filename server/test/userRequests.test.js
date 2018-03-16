import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../lib/app';
import db from '../models/index';

const { expect } = chai;
const { User } = db;
chai.use(chaiHttp);
const baseEndpoint = '/api/v1/weconnect/auth';

describe(`${baseEndpoint}`, () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => Promise.resolve(done()))
      .catch(err => Promise.reject(done(err)));
  });

  describe(`${baseEndpoint}/signUp`, () => {
    it('works', (done) => {
      const userDetails = {
        firstname: 'Damilola',
        lastname: 'Ajiboye',
        email: 'damilolaajiboye@live.com',
        password: 'dammyro1000',
        telephoneNumber: '07066455523',
        homeNumber: '08043553081',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.userCreatedMessage).to.equal('User created succesfully');
          expect(res.body.user.lastname).to.equal('Ajiboye');
          expect(res.body.user).to.have.property('id');
          expect(res.body.user.telephoneNumber).to.equal('07066455523');
          expect(res.body.user.email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });
  });

  describe(`${baseEndpoint}/signUp`, () => {
    it('catches validation errors', (done) => {
      const userDetails = {
        firstname: 'D',
        lastname: 'B',
        email: 'damilolaajiboyelive.com',
        password: bcrypt.hashSync('dammyro100', bcrypt.genSaltSync(10)),
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
      };
      chai.request(app)
        .post(`${baseEndpoint}/signUp`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.a('array');
          expect(res.body[0].error).to.equal('Please provide a name with atleast 5 and not more than 50 characters');
          expect(res.body[1].error).to.equal('lastname should be more than 5 and not greater than 500');
          expect(res.body[2].error).to.equal('Enter a valid Email Address');
          done();
        });
    });
  });

  describe(`${baseEndpoint}/login`, () => {
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
    it('Authenticates the user', (done) => {
      const userDetails = {
        email: 'damilolaajiboye@livea.com',
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
  });
  describe(`${baseEndpoint}/login`, () => {
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
    it('catches invalid login input', (done) => {
      const userDetails = {
        email: 'damilolaajiboye@livea.com',
        password: 'a'
      };
      chai.request(app)
        .post(`${baseEndpoint}/login`)
        .send(userDetails)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body[0].error).to.equal('password should be more than 5 and not greater than 16 characters');
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
    it('works', (done) => {
      const userDetails = {
        email: 'damilolaajiboye@livea.com',
        password: 'dammyra1000'
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
});

