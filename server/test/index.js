import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../lib/app';
import businesses from '../models/businesses';

chai.use(chaiHttp);
const baseEndpoint = '/api/v1/weconnect';

/*
 * POST /api/v1/weconnect/businesses route to register a business.
 */
describe('/api/v1/weconnect/ POST businesses', () => {
  it('it should add a business to the businesses array', (done) => {
    const business = {
      id: businesses[businesses.length - 1].id + 1,
      name: 'Ajiboye Julius',
      category: 'Housing',
      email: 'ajiboye_j@yahoo.com',
      number: { home: '07011041032', office: '08011031456' },
      location: 'Enugu',
      businessAddress: '7,Adeba Road Lakowe Lagos',
      businessDescription: 'Rent houses here'
    };
    chai.request(app)
      .post(`${baseEndpoint}/businesses`)
      .send(business)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.message).to.be.eql('Business has been registered successfully');
        done();
      });
  });
});

