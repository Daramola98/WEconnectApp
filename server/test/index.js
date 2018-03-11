import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../lib/app';
import businesses from '../models/businesses';

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
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.eql('Business has been registered successfully');
        done();
      });
  });
});

/*
 * Validation for POST /api/v1/weconnect/businesses route to register a business.
 */
describe('/api/v1/weconnect/ POST businesses', () => {
  it('it should check for validation errors and catch them before registering a business', (done) => {
    const business = {
      id: businesses[businesses.length - 1].id + 1,
      name: 'House rentals',
      category: '',
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
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('array');
        expect(res.body[0].error).to.be.eql('Business Category is required');
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
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
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
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.have.property('location').eql('Abuja');
        done();
      });
  });
});

/*
 *Validation Test for GET /api/v1/weconnect/businesses?location=<location>
  To get businesses with specified location.
 */
describe('/api/v1/weconnect/ GET businesses?location=<location>', () => {
  it('it should return list of validation errors', (done) => {
    chai.request(app)
      .get(`${baseEndpoint}/businesses?location=a`)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('array');
        expect(res.body[0].error).to.equal('Location should be more than 2 and not greater than 100 characters');
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
      .get(`${baseEndpoint}/businesses?category=gaming`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.have.property('category').eql('gaming');
        done();
      });
  });
});

/*
 * Validation test for GET /api/v1/weconnect/businesses?category=<category> *
 * To get businesses with specified category.
 */
describe('/api/v1/weconnect/ GET businesses?category=<category>', () => {
  it('it should return list of validation errors', (done) => {
    chai.request(app)
      .get(`${baseEndpoint}/businesses?category=g`)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('array');
        expect(res.body[0].error).to.equal('Category should be more than 2 and not greater than 50 characters');
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
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('location').eql('Lagos');
        done();
      });
  });
});

/*
 * Validation for GET /api/v1/weconnect/businesses/:businessId route to get a business.
 */
describe('/api/v1/weconnect/ GET businesses/:businessId', () => {
  it('it should return list of validation errors', (done) => {
    chai.request(app)
      .get(`${baseEndpoint}/businesses/dara`)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('array');
        expect(res.body[0].error).to.equal('Your Business id should be a number');
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
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('name').eql('Oil and Gas');
        done();
      });
  });
});

/*
 * Validation for  PUT /api/v1/weconnect/businesses/:businessId route to get a business.
 */
describe('/api/v1/weconnect/ PUT businesses/:businessId', () => {
  it('it should return list of validation errors', (done) => {
    chai.request(app)
      .put(`${baseEndpoint}/businesses/1`)
      .send({ name: 'Oi', category: 'hi' })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.lengthOf(2);
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
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').eql('Business has been deleted');
        done();
      });
  });
});

/*
 * Validation test for DELETE /api/v1/weconnect/businesses/:businessId route to remove a business.
 */
describe('/api/v1/weconnect/ DELETE businesses/:businessId', () => {
  it('it should return a list of validation errors', (done) => {
    chai.request(app)
      .delete(`${baseEndpoint}/businesses/weconnect`)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('array');
        expect(res.body[0].error).to.equal('Your Business id should be a number');
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
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').eql('Business Review Added');
        done();
      });
  });
});

/*
 * Validation test for POST /api/v1/weconnect/businesses/:businessId/reviews route
 * To add a review to a business.
 */
describe('/api/v1/weconnect/ POST businesses/:businessId/reviews', () => {
  it('it should add a review to business with the given id', (done) => {
    chai.request(app)
      .post(`${baseEndpoint}/businesses/3/reviews`)
      .send({ username: 'Julius', review: 'hi' })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('array');
        expect(res.body[0].error).to.equal('Business Review should be more than 2 and not greater than 50 characters');
        done();
      });
  });
});

/*
 * GET /api/v1/weconnect/businesses/:businessId/reviews route to get reviews of a business.
 */
describe('/api/v1/weconnect/ GET businesses/:businessId/reviews', () => {
  it('it should get reviews of a business with the given id', (done) => {
    const businessId = 1;
    chai.request(app)
      .get(`${baseEndpoint}/businesses/${businessId}/reviews`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.have.property('userName').eql('daramola');
        done();
      });
  });
});

