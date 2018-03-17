import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../lib/app';
import db from '../models/index';

const { expect } = chai;
const { User, Business } = db;
chai.use(chaiHttp);
const baseEndpoint = '/api/v1/weconnect/businesses';
let authToken;

describe(`${baseEndpoint}`, () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => {
        const userDetails = {
          firstname: 'Damilola',
          lastname: 'Ajiboye',
          email: 'damilolaajiboye@live.com',
          password: bcrypt.hashSync('dammyro1000', bcrypt.genSaltSync(10)),
          telephoneNumber: '07066455523',
          homeNumber: '08043553081',
        };
        User.create(userDetails)
          .then(() => Promise.resolve(done()))
          .catch(err => Promise.reject(done()));
      });
  });
  /*
 * POST /api/v1/weconnect/businesses route to register a business.
 */
  describe(`${baseEndpoint} POST businesses`, () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/weconnect/auth/login')
        .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
        .end((err, res) => {
          authToken = `Bearer ${res.body.token}`;
          done();
        });
    });
    it('it should add a business to the businesses database', (done) => {
      const businessDetails = {
        name: 'House rentals',
        category: 'Housing',
        email: 'ajiboye_j@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'Enugu',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here',
        UserId: 1
      };
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('Authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Business has been registered successfully');
          expect(res.body.business.name).to.equal('House rentals');
          expect(res.body.business).to.have.property('id');
          expect(res.body.business.telephoneNumber).to.equal('07011041032');
          expect(res.body.business.email).to.equal('ajiboye_j@yahoo.com');
          done();
        });
    });
  });
  /*
 * GET /api/v1/weconnect/businesses route to get all businesses.
 */
  describe(`${baseEndpoint} GET businesses`, () => {
    before((done) => {
      const businessDetails = {
        name: 'Clash of clans',
        email: 'damilolaajiboye@live.com',
        location: 'Lagos',
        category: 'gaming',
        description: 'Game for collaboration',
        address: '23,Adeba Ibeju Lekki Lagos',
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
        UserId: 1
      };
      Business.create(businessDetails);
      done();
    });

    it('it should get all business in the businesses table', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].name).to.equal('Clash of clans');
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0].telephoneNumber).to.equal('070664455523');
          expect(res.body[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });
  });
  /*
 * GET /api/v1/weconnect/businesses/:buisnessId route to retrieve a business with id.
 */
  describe(`${baseEndpoint}/:businessId GET business`, () => {
    before((done) => {
      const businessDetails = {
        name: 'Clash of clans',
        email: 'damilolaajiboye@live.com',
        location: 'Lagos',
        category: 'gaming',
        description: 'Game for collaboration',
        address: '23,Adeba Ibeju Lekki Lagos',
        telephoneNumber: '070664455523',
        homeNumber: '08043553081',
        UserId: 1
      };
      const businessDetails2 = {
        name: 'Clash Royale',
        email: 'damilolaajiboye@yahoo.com',
        location: 'Lagos',
        category: 'gaming',
        description: 'Card Game for collaboration',
        address: '23,Adeba Ibeju Lekki Lagos',
        telephoneNumber: '070664445523',
        homeNumber: '08043553081',
        UserId: 1
      };
      Business.bulkCreate(businessDetails, businessDetails2);
      done();
    });
    it('it should add a business to the businesses database', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/2`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Business found');
          expect(res.body.business.name).to.equal('Clash Royale');
          expect(res.body.business).to.have.property('id');
          expect(res.body.business.id).to.equal(2);
          expect(res.body.business.telephoneNumber).to.equal('070664445523');
          expect(res.body.business.email).to.equal('damilolaajiboye@yahoo.com');
          done();
        });
    });
  });
  /*
 * POST /api/v1/weconnect/businesses route to register a business.
 */
  describe(`${baseEndpoint} POST businesses`, () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/weconnect/auth/login')
        .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
        .end((err, res) => {
          authToken = `Bearer ${res.body.token}`;
          done();
        });
    });
    it('it should add a business to the businesses database', (done) => {
      const businessDetails = {
        name: 'House rentals',
        category: 'Housing',
        email: 'ajiboye_j@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'Enugu',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here',
        UserId: 1
      };
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('Authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Business has been registered successfully');
          expect(res.body.business.name).to.equal('House rentals');
          expect(res.body.business).to.have.property('id');
          expect(res.body.business.telephoneNumber).to.equal('07011041032');
          expect(res.body.business.email).to.equal('ajiboye_j@yahoo.com');
          done();
        });
    });
  });
  /*
 * POST /api/v1/weconnect/businesses route to register a business.
 */
  describe(`${baseEndpoint} POST businesses`, () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/weconnect/auth/login')
        .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
        .end((err, res) => {
          authToken = `Bearer ${res.body.token}`;
          done();
        });
    });
    it('it should add a business to the businesses database', (done) => {
      const businessDetails = {
        name: 'House rentals',
        category: 'Housing',
        email: 'ajiboye_j@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'Enugu',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here',
        UserId: 1
      };
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('Authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Business has been registered successfully');
          expect(res.body.business.name).to.equal('House rentals');
          expect(res.body.business).to.have.property('id');
          expect(res.body.business.telephoneNumber).to.equal('07011041032');
          expect(res.body.business.email).to.equal('ajiboye_j@yahoo.com');
          done();
        });
    });
  });
  /*
 * POST /api/v1/weconnect/businesses route to register a business.
 */
  describe(`${baseEndpoint} POST businesses`, () => {
    beforeEach((done) => {
      chai.request(app)
        .post('/api/v1/weconnect/auth/login')
        .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
        .end((err, res) => {
          authToken = `Bearer ${res.body.token}`;
          done();
        });
    });
    it('it should add a business to the businesses database', (done) => {
      const businessDetails = {
        name: 'House rentals',
        category: 'Housing',
        email: 'ajiboye_j@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'Enugu',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here',
        UserId: 1
      };
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('Authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Business has been registered successfully');
          expect(res.body.business.name).to.equal('House rentals');
          expect(res.body.business).to.have.property('id');
          expect(res.body.business.telephoneNumber).to.equal('07011041032');
          expect(res.body.business.email).to.equal('ajiboye_j@yahoo.com');
          done();
        });
    });
  });
});

