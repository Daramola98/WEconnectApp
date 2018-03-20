import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../lib/app';
import db from '../../models/index';
import userData from '../testData/userData';
import businessData from '../testData/businessData';

const { expect } = chai;
const { User, Business, BusinessReview } = db;
chai.use(chaiHttp);
const baseEndpoint = '/api/v1/weconnect/businesses';
let authToken;

describe(`${baseEndpoint}`, () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => {
        User.create(userData.userDetails)
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
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessData.businessDetails)
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

    it('it should catch authentication failures before adding a business to the businesses database', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', 'invalidToken')
        .send(businessData.businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Authentication failed');
          done();
        });
    });

    it('it should catch validation errors before adding a business to the businesses database', (done) => {
      const businessDetails3 = {
        name: 'Cl',
        category: 'gaming',
        email: 'daraajibigad@gmail.com',
        telephoneNumber: '0706645552'
      };

      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessDetails3)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('array');
          expect(res.body[0].error).to.equal('Please provide a business name with atleast 5 and not more than 50 characters');
          expect(res.body[1].error).to.equal('Provide a description of your business not more than 500 characters');
          done();
        });
    });

    it('it should not allow a user to register a business with an existing name and email to the businesses database', (done) => {
      Business.create(businessData.businessDetails);
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessData.businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Business with same name and email address already exists');
          done();
        });
    });

    it('it should not allow a user to register a business with an existing email address to the businesses database', (done) => {
      Business.create(businessData.businessDetails);
      const businessDetails = {
        name: 'House Mortgage',
        category: 'Housing',
        email: 'ajiboye_j@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'Enugu',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for affordable prices',
        UserId: 1
      };
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Business with same email address already exists');
          done();
        });
    });

    it('it should not allow a user to register a business with an existing name to the businesses database', (done) => {
      Business.create(businessData.businessDetails);
      const businessDetails = {
        name: 'House rentals',
        category: 'Housing',
        email: 'maker@hotmail.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'Enugu',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for affordable prices',
        UserId: 1
      };
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Business with same name already exists');
          done();
        });
    });

    it('it should not allow a user to register a business without the required fields', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('array');
          expect(res.body[0].error).to.equal('Your Business name is required');
          expect(res.body[1].error).to.equal('Please provide a business name with atleast 5 and not more than 50 characters');
          expect(res.body[2].error).to.equal('Provide a description of your business not more than 500 characters');
          done();
        });
    });
  });

  /*
 * GET /api/v1/weconnect/businesses route to get all businesses.
 */
  describe(`${baseEndpoint} GET businesses`, () => {
    beforeEach((done) => {
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

    it('it should get all business in the specified location when a location query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?location=lagos`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.business[0].name).to.equal('Clash of clans');
          expect(res.body.business[0]).to.have.property('id');
          expect(res.body.business[0].location).to.equal('Lagos');
          expect(res.body.business[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });

    it('it returns a message when no business found in specified location', (done) => {
      const location = 10;
      chai.request(app)
        .get(`${baseEndpoint}?location=${location}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('No Businesses found in the specified location');
          done();
        });
    });

    it('it catches validation error for empty input when a location query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?location= `)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('array');
          expect(res.body[0].error).to.equal('Location should be more than 0 and not greater than 100 characters');
          done();
        });
    });

    it('it should get all business in the specified category when a category query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?category=gaming `)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.business[0].name).to.equal('Clash of clans');
          expect(res.body.business[0]).to.have.property('id');
          expect(res.body.business[0].location).to.equal('Lagos');
          expect(res.body.business[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });

    it('it returns a message when no business found in specified category', (done) => {
      const category = 10;
      chai.request(app)
        .get(`${baseEndpoint}?category=${category}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('No Businesses found in the specified category');
          done();
        });
    });

    it('it catches validation error for empty input when a category query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?category= `)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('array');
          expect(res.body[0].error).to.equal('Category should be more than 0 and not greater than 50 characters');
          done();
        });
    });

    it('it should get all business in the specified category and location when a category and location query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?location=lagos&category=gaming `)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.business[0].name).to.equal('Clash of clans');
          expect(res.body.business[0]).to.have.property('id');
          expect(res.body.business[0].location).to.equal('Lagos');
          expect(res.body.business[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });
  });

  /*
 * GET /api/v1/weconnect/businesses/:buisnessId route to retrieve a business with id.
 */
  describe(`${baseEndpoint}/:businessId GET business`, () => {
    beforeEach((done) => {
      Business.create(businessData.businessDetails2);
      done();
    });

    it('it should retrieve a business with the specified businessId', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/1`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.businessFoundMessage).to.equal('Business found');
          expect(res.body.business.name).to.equal('Clash Royale');
          expect(res.body.business).to.have.property('id');
          expect(res.body.business.id).to.equal(1);
          expect(res.body.business.telephoneNumber).to.equal('070664445523');
          expect(res.body.business.email).to.equal('damilolaajiboye@yahoo.com');
          done();
        });
    });

    it('it should return a message if business with the specified businessId is not in database', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/2`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business not found');
          done();
        });
    });

    it('it should validate the business id', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/hi`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body[0].error).to.equal('Your Business id should be an integer');
          done();
        });
    });
  });


  /*
 * PUT /api/v1/weconnect/businesses/:businessId route to update a business with the specified Id.
 */
  describe(`${baseEndpoint}/:businessId UPDATE business`, () => {
    beforeEach((done) => {
      const businessDetails = {
        name: 'Solar Installation',
        category: 'Energy',
        email: 'peterfredrick@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'Bauchi',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for a nice and affotdable price',
        UserId: 1
      };
      Business
        .create(businessDetails)
        .then((business) => {
          chai.request(app)
            .post('/api/v1/weconnect/auth/login')
            .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
            .end((err, res) => {
              authToken = `Bearer ${res.body.token}`;
              done();
            });
        })
        .catch(err => done(err));
    });

    it('it should update a business with the specified id in the database', (done) => {
      const businessDetails = {
        name: 'Solar rentals',
        category: 'Renewable energy',
        telephoneNumber: '08023112081',
        location: 'Makurdi',
      };
      chai.request(app)
        .put(`${baseEndpoint}/1`)
        .set('authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Business Updated successfully');
          expect(res.body.updatedBusiness.name).to.equal('Solar rentals');
          expect(res.body.updatedBusiness).to.have.property('id');
          expect(res.body.updatedBusiness.telephoneNumber).to.equal('08023112081');
          expect(res.body.updatedBusiness.location).to.equal('Makurdi');
          done();
        });
    });

    it('it should catch validation errors', (done) => {
      const businessDetails = {
        name: 'So',
        category: 'Renewable energy',
        telephoneNumber: '08023112081',
        location: 'Makurdi',
      };
      chai.request(app)
        .put(`${baseEndpoint}/1`)
        .set('authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body[0].error).to.equal('Please provide a business name with atleast 5 characters and max 50 characters');
          done();
        });
    });

    it('it return a message if business is not found', (done) => {
      const businessDetails = {
        name: 'Solar rentals',
        category: 'Renewable energy',
        telephoneNumber: '08023112081',
        location: 'Makurdi',
      };
      chai.request(app)
        .put(`${baseEndpoint}/100`)
        .set('authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business with specified id not found');
          done();
        });
    });
  });

  /*
 * DELETE /api/v1/weconnect/businesses route to delete a business.
 */
  describe(`${baseEndpoint}/:businessId DELETE business`, () => {
    beforeEach((done) => {
      Business.create(businessData.businessDetails1)
        .then((business) => {
          chai.request(app)
            .post('/api/v1/weconnect/auth/login')
            .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
            .end((err, res) => {
              authToken = `Bearer ${res.body.token}`;
              done();
            });
        })
        .catch(err => done(err));
    });

    it('it should delete a business from the businesses database', (done) => {
      chai.request(app)
        .delete(`${baseEndpoint}/1`)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Business has been deleted');
          done();
        });
    });

    it('it should return message if business with specified id is not found', (done) => {
      chai.request(app)
        .delete(`${baseEndpoint}/2`)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business not found');
          done();
        });
    });
  });

  /*
 * POST /api/v1/weconnect/businesses/:businessId route to add a business review.
 */
  describe(`${baseEndpoint}/:businessId/reviews POST business review`, () => {
    beforeEach((done) => {
      Business.create(businessData.businessDetails1)
        .then((business) => {
          chai.request(app)
            .post('/api/v1/weconnect/auth/login')
            .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
            .end((err, res) => {
              authToken = `Bearer ${res.body.token}`;
              done();
            });
        })
        .catch(err => done(err));
    });

    it('it should add a review to a business in the businesses database with the specified id', (done) => {
      const review = { review: 'Business is so great would like to invest' };
      chai.request(app)
        .post(`${baseEndpoint}/1/reviews`)
        .send(review)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.businessReviewMessage).to.equal('Business Review Added');
          expect(res.body.review.review).to.equal('Business is so great would like to invest');
          done();
        });
    });

    it('it should return message if business with specified id is not found', (done) => {
      const review = { review: 'Business is so great would like to invest like now' };
      chai.request(app)
        .post(`${baseEndpoint}/2/reviews`)
        .send(review)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business not found');
          done();
        });
    });

    it('it should catch validation errors', (done) => {
      const review = { review: 'B' };
      chai.request(app)
        .post(`${baseEndpoint}/1/reviews`)
        .send(review)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('array');
          expect(res.body[0].error).to.equal('Business Review should be more than 2 and not greater than 500 characters');
          done();
        });
    });

    it('it should catch required fields validation errors', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}/1/reviews`)
        .send({ review: '' })
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('array');
          expect(res.body[1].error).to.equal('Business Review should be more than 2 and not greater than 500 characters');
          expect(res.body[0].error).to.equal('Business review is required');
          done();
        });
    });
  });

  /*
 * GET /api/v1/weconnect/businesses/:businessId route to get reviews for a business.
 */
  describe(`${baseEndpoint}/:businessId/reviews GET business review`, () => {
    beforeEach((done) => {
      Business.create(businessData.businessDetails1)
        .then((business) => {
          chai.request(app)
            .post('/api/v1/weconnect/auth/login')
            .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
            .end((err, res) => {
              authToken = `Bearer ${res.body.token}`;
            });
          const review = { review: 'Business is so great would like to invest' };
          chai.request(app)
            .post(`${baseEndpoint}/1/reviews`)
            .send(review)
            .set('authorization', authToken)
            .end((err, res) => {
              done();
            });
        })
        .catch(err => done(err));
    });

    it('it should get reviews for a business in the businesses database with the specified id', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/1/reviews`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.reviewFoundMessage).to.equal('Reviews have been found');
          expect(res.body.reviews[0].review).to.equal('Business is so great would like to invest');
          done();
        });
    });

    it('it should return a message if business is not found in the database', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/2/reviews`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business does not exist, Enter id for existing business');
          done();
        });
    });

    it('it should return a message if no reviews have been added for that business', (done) => {
      BusinessReview.truncate();
      chai.request(app)
        .get(`${baseEndpoint}/1/reviews`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Reviews have not been added for this Business');
          done();
        });
    });
  });
});

