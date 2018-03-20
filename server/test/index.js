import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../lib/app';
import businesses from '../dummymodel/businessesDummy';

chai.use(chaiHttp);
const baseEndpoint = '/api/v1/weconnect';
const { expect } = chai;

/*
 * GET / route to get api documentation.
 */
describe('/ GET ', () => {
  it('it should return api documentation', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});

