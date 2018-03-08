import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../lib/app';
import businesses from '../models/businesses';

chai.use(chaiHttp);
const baseEndpoint = '/api/v1/weconnect';

/*
 * GET / route to get api documentation.
 */
describe('/ GET ', () => {
  it('it should return api documentation', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        done();
      });
  });
});

/*
 * POST /api/v1/weconnect/businesses route to register a business.
 */
describe('/api/v1/weconnect/ POST businesses', () => {
  it('it should add a business to the businesses array', (done) => {
    const business = {
      id: businesses[businesses.length - 1].id + 1,
      name: 'House rentals',
      category: 'Housing',
      email: 'ajiboye_j@yahoo.com',
      telephoneNumber: '07011041032',
      officeNumber: '08011031456',
      location: 'Enugu',
      businessAddress: '7,Adeba Road Lakowe Lagos',
      businessDescription: 'Rent houses here'
    };
    chai.request(app)
      .post(`${baseEndpoint}/businesses`)
      .send(business)
      .end((err, res) => {
        chai.expect(res.status).to.equal(201);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body.message).to.be.eql('Business has been registered successfully');
        done();
      });
  });
});

/*
 * GET /api/v1/weconnect/businesses route to get businesses.
 */
describe('/api/v1/weconnect/ GET businesses', () => {
  it('it should return list of all businesses', (done) => {
    chai.request(app)
      .get(`${baseEndpoint}/businesses`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('array');
        done();
      });
  });
});

/*
 * GET /api/v1/weconnect/businesses?location=<location> to get businesses with specified location.
 */
describe('/api/v1/weconnect/ GET businesses?location=<location>', () => {
  it('it should return list of all businesses in the specified location', (done) => {
    chai.request(app)
      .get(`${baseEndpoint}/businesses?location=abuja`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('array');
        chai.expect(res.body[0]).to.have.property('location').eql('Abuja');
        done();
      });
  });
});

/*
 * GET /api/v1/weconnect/businesses?category=<category> to get businesses with specified category.
 */
describe('/api/v1/weconnect/ GET businesses?category=<category>', () => {
  it('it should return list of all businesses in the specified category', (done) => {
    chai.request(app)
      .get(`${baseEndpoint}/businesses?category=housing`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('array');
        chai.expect(res.body[0]).to.have.property('category').eql('Housing');
        done();
      });
  });
});

/*
 * GET /api/v1/weconnect/businesses/:businessId route to get a business.
 */
describe('/api/v1/weconnect/ GET businesses/:businessId', () => {
  it('it should get a business by the given id', (done) => {
    chai.request(app)
      .get(`${baseEndpoint}/businesses/2`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('location').eql('Lagos');
        done();
      });
  });
});

/*
 * PUT /api/v1/weconnect/businesses/:businessId route to get a business.
 */
describe('/api/v1/weconnect/ PUT businesses/:businessId', () => {
  it('it should update a business with the given id', (done) => {
    chai.request(app)
      .put(`${baseEndpoint}/businesses/2`)
      .send({ name: 'Oil and Gas' })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('name').eql('Oil and Gas');
        done();
      });
  });
});

/*
 * DELETE /api/v1/weconnect/businesses/:businessId route to remove a business.
 */
describe('/api/v1/weconnect/ DELETE businesses/:businessId', () => {
  it('it should delete a business with the given id', (done) => {
    chai.request(app)
      .delete(`${baseEndpoint}/businesses/2`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('message').eql('Business has been deleted');
        done();
      });
  });
});

/*
 * POST /api/v1/weconnect/businesses/:businessId/reviews route to add a review to a business.
 */
describe('/api/v1/weconnect/ POST businesses/:businessId/reviews', () => {
  it('it should add a review to business with the given id', (done) => {
    chai.request(app)
      .post(`${baseEndpoint}/businesses/3/reviews`)
      .send({ username: 'Julius', review: 'Nice' })
      .end((err, res) => {
        chai.expect(res.status).to.equal(201);
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.body).to.have.property('message').eql('Business Review Added');
        done();
      });
  });
});

/*
 * GET /api/v1/weconnect/businesses/:businessId/reviews route to get reviews of a business.
 */
describe('/api/v1/weconnect/ GET businesses/:businessId/reviews', () => {
  it('it should get reviews of a business with the given id', (done) => {
    chai.request(app)
      .get(`${baseEndpoint}/businesses/1/reviews`)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.a('array');
        chai.expect(res.body[0]).to.have.property('userName').eql('daramola');
        done();
      });
  });
});

