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

