import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../lib/app';

chai.use(chaiHttp);
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

/*
 * GET / all routes that are not defined.
 */
describe('/ GET undefined routes ', () => {
  it('it should return error message', (done) => {
    chai.request(app)
      .get('/hello')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.equal('Endpoint not Found');
        done();
      });
  });
});

