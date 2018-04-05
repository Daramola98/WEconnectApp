import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../../lib/app';
import db, { User, Business, BusinessReview } from '../../models/index';
import { userDetails, userDetails1 } from '../testData/userData';
import { businessDetails, businessDetails1, businessDetails2 } from '../testData/businessData';

// const { expect } = chai;
// const { User, Business, BusinessReview } = db;
chai.use(chaiHttp);
const baseEndpoint = '/api/v1/businesses';
let authToken;
let authToken2;
let userId;
let businessId;
let businessId2;

describe(`${baseEndpoint}`, () => {
  beforeEach((done) => {
    db.Business.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => {
        User.create({
          firstname: 'Damilola',
          lastname: 'Ajiboye',
          email: 'damilolaajiboye@live.com',
          password: bcrypt.hashSync('dammyro1000', 10),
          telephoneNumber: '07066455523',
          homeNumber: '08043553081',
        })
          .then((user) => {
            userId = user.id;
            chai.request(app)
              .post('/api/v1/auth/login')
              .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
              .end((err, res) => {
                authToken = res.body.token;
                done();
              });
          })
          .catch(err => Promise.reject(done()));
      })
      .catch(err => Promise.reject(done()));
  });
  /*
 * POST /api/v1/businesses route to register a business.
 */
  describe(`${baseEndpoint} POST businesses`, () => {
    // beforeEach((done) => {
    //   chai.request(app)
    //     .post('/api/v1/auth/login')
    //     .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
    //     .end((err, res) => {
    //       authToken = res.body.token;
    //       done();
    //     });
    // });

    it('should add a business to the businesses database', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Business has been registered successfully');
          expect(res.body.createdBusinessDetails.name).to.equal('House rentals');
          // expect(res.body.business).to.have.property('id');
          expect(res.body.createdBusinessDetails.telephoneNumber).to.equal('07011041032');
          expect(res.body.createdBusinessDetails.email).to.equal('ajiboye_j@yahoo.com');
          done();
        });
    });

    it('should catch authentication failures before adding a business to the businesses database', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', 'invalidToken')
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Authentication failed');
          done();
        });
    });

    it('should catch validation errors before adding a business to the businesses database', (done) => {
      const businessDetails3 = {
        name: 'Cl',
        category: 'gaming',
        email: 'daraajibigad@gmail.com',
        telephoneNumber: '0706645552',
        address: '',
        homeNumber: '08011031456',
        location: 'Enugu',
        description: 'Rent houses here for affordable prices'
      };

      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessDetails3)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('array');
          expect(res.body[0]).to.equal('Business Address is required');
          // expect(res.body[1]).to.equal('Business Address is required');
          done();
        });
    });

    it('should not allow a user to register a business with an existing name and email to the businesses database', (done) => {
      Business.create(businessDetails);
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessDetails)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Business Name already exists');
          done();
        });
    });

    it('should not allow a user to register a business with an existing email address to the businesses database', (done) => {
      Business.create({
        name: 'House rentals',
        category: 'HOUSING',
        email: 'ajiboye_j@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'ENUGU',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for affordable prices',
        userId
      });
      const businessDetails4 = {
        name: 'House Mortgage',
        category: 'Housing',
        email: 'ajiboye_j@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'Enugu',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for affordable prices'
      };
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send(businessDetails4)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Email already exists');
          done();
        });
    });

    it('should not allow a user to register a business without the required fields', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}`)
        .set('authorization', authToken)
        .send({
          name: '',
          email: '',
          location: '',
          category: '',
          description: '',
          address: '',
          telephoneNumber: '',
          homeNumber: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('array');
          expect(res.body[0]).to.equal('Business name is required');
          expect(res.body[1]).to.equal('Business Name should be a valid string');
          expect(res.body[2]).to.equal('Business description is required');
          done();
        });
    });
  });

  /*
 * GET /api/v1/businesses route to get all businesses.
 */
  describe(`${baseEndpoint} GET businesses`, () => {
    beforeEach((done) => {
      const businessDetails5 = {
        name: 'Clash of clans',
        email: 'damilolaajiboye@live.com',
        location: 'LAGOS',
        category: 'GAMING',
        description: 'Game for collaboration',
        address: '23,Adeba Ibeju Lekki Lagos',
        telephoneNumber: '07066445523',
        homeNumber: '08043553081'
      };
      chai.request(app)
        .post(`${baseEndpoint}`)
        .send(businessDetails5)
        .set('authorization', authToken)
        .end((err, res) => {
          done();
        });
      // chai.request(app)
      //   .post('/api/v1/auth/login')
      //   .send({ email: 'damilolaajiboye@live.com', password: 'dammyro1000' })
      //   .end((err, res) => {
      //     authToken = res.body.token;
      //   });
    });
    it('should get all business in the businesses table', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].name).to.equal('Clash of clans');
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0].telephoneNumber).to.equal('07066445523');
          expect(res.body[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });

    it('should get all businesses registered by a user', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/user`)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].name).to.equal('Clash of clans');
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0].telephoneNumber).to.equal('07066445523');
          expect(res.body[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });

    it('should get all business in the specified location when a location query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?location=lagos`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.business[0].name).to.equal('Clash of clans');
          expect(res.body.business[0]).to.have.property('id');
          expect(res.body.business[0].location).to.equal('LAGOS');
          expect(res.body.business[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });

    it('returns a message when no business found in specified location', (done) => {
      const location = 10;
      chai.request(app)
        .get(`${baseEndpoint}?location=${location}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No Businesses found in the specified location');
          done();
        });
    });

    it('catches validation error for empty input when a location query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?location= `)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Location is required');
          done();
        });
    });

    it('should get all business in the specified category when a category query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?category=gaming `)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.business[0].name).to.equal('Clash of clans');
          expect(res.body.business[0]).to.have.property('id');
          expect(res.body.business[0].location).to.equal('LAGOS');
          expect(res.body.business[0].category).to.equal('GAMING');
          expect(res.body.business[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });

    it('should get all business in the specified category and location when a category and location query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?category=gaming&location=lagos`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.business[0].name).to.equal('Clash of clans');
          expect(res.body.business[0]).to.have.property('id');
          expect(res.body.business[0].location).to.equal('LAGOS');
          expect(res.body.business[0].category).to.equal('GAMING');
          expect(res.body.business[0].email).to.equal('damilolaajiboye@live.com');
          done();
        });
    });
    it('returns a message when no business found in specified category', (done) => {
      const category = 10;
      chai.request(app)
        .get(`${baseEndpoint}?category=${category}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No Businesses found in the specified category');
          done();
        });
    });

    it('catches validation error for empty input when a category query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?category= `)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Category is required');
          done();
        });
    });


    it('should return message if no business in the specified category and location when a category and location query is passed', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}?location=lagos&category=housing `)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Business not found');
          done();
        });
    });
  });

  /*
   * GET /api/v1/businesses route to get all businesses.
   */
  describe(`${baseEndpoint} GET a user's businesses`, () => {
    beforeEach((done) => {
      User.create({
        firstname: 'Clinton',
        lastname: 'Fidelis',
        email: 'clintfidel@gmail.com',
        password: bcrypt.hashSync('daramola10', bcrypt.genSaltSync(10)),
        telephoneNumber: '08023112094',
        homeNumber: '08022235912'
      })
        .then((user) => {
          chai.request(app)
            .post('/api/v1/auth/login')
            .send({ email: 'clintfidel@gmail.com', password: 'daramola10' })
            .end((err, res) => {
              authToken2 = res.body.token;
              done();
            });
        });
    });

    it('should return a message if user has not registered a business', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/user`)
        .set('authorization', authToken2)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('No Businesses');
          done();
        });
    });
  });

  /*
   * GET /api/v1/businesses/:buisnessId route to retrieve a business with id.
   */
  describe(`${baseEndpoint}/:businessId GET business`, () => {
    beforeEach((done) => {
      Business.create(businessDetails2)
        .then((business) => {
          businessId = business.id;
          done();
        });
    });

    it('should retrieve a business with the specified businessId', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/${businessId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Business found');
          expect(res.body.business.name).to.equal('Clash Royale');
          expect(res.body.business).to.have.property('id');
          expect(res.body.business.id).to.equal(businessId);
          expect(res.body.business.telephoneNumber).to.equal('07066444523');
          expect(res.body.business.email).to.equal('damilolaajiboye@yahoo.com');
          done();
        });
    });

    it('should return a message if business with the specified businessId is not in database', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/faf79f92-fab6-4c45-9519-38f6564c3711`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business not found');
          done();
        });
    });

    it('should validate the business id', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/hi`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Business id should be a uuid');
          done();
        });
    });
  });

  /*
   * DELETE /api/v1/businesses route to delete a business.
   */
  describe(`${baseEndpoint}/:businessId DELETE business`, () => {
    beforeEach((done) => {
      Business.create({
        name: 'Weather Control',
        category: 'GAMING',
        email: 'weather@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'LAGOS',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for affordable prices',
        userId
      })
        .then((business) => {
          businessId = business.id;
          done();
        })
        .catch(err => done(err));
    });

    it('should delete a business from the businesses database', (done) => {
      chai.request(app)
        .delete(`${baseEndpoint}/${businessId}`)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Business has been deleted');
          done();
        });
    });

    it('should return message if business with specified id is not found', (done) => {
      chai.request(app)
        .delete(`${baseEndpoint}/faf79f92-fab6-4c45-9519-38f6564c3711`)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business not found');
          done();
        });
    });
  });

  /*
   * POST /api/v1/businesses/:businessId route to add a business review.
   */
  describe(`${baseEndpoint}/:businessId/reviews POST business review`, () => {
    beforeEach((done) => {
      Business.create({
        name: 'Weather Control',
        category: 'GAMING',
        email: 'weather@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'LAGOS',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for affordable prices',
        userId
      })
        .then((business) => {
          businessId = business.id;
          done();
        })
        .catch(err => done(err));
    });

    it('should add a review to a business in the businesses database with the specified id', (done) => {
      const review = { review: 'Business is so great would like to invest' };
      chai.request(app)
        .post(`${baseEndpoint}/${businessId}/reviews`)
        .send(review)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Business Review Added');
          expect(res.body.reviewDetails.review).to.equal('Business is so great would like to invest');
          done();
        });
    });

    it('should return message if business with specified id is not found', (done) => {
      const review = { review: 'Business is so great would like to invest like now' };
      chai.request(app)
        .post(`${baseEndpoint}/faf79f92-fab6-4c45-9519-38f6564c3711/reviews`)
        .send(review)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business not found');
          done();
        });
    });

    it('should catch validation errors', (done) => {
      const review = { review: 'B' };
      chai.request(app)
        .post(`${baseEndpoint}/${businessId}/reviews`)
        .send(review)
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.validationErrors[0]).to.equal('Business Review should be more than 1 and not greater than 500 characters');
          done();
        });
    });

    it('should catch required fields validation errors', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}/${businessId}/reviews`)
        .send({ review: '' })
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body[0]).to.equal('Review is required');
          done();
        });
    });
  });

  /*
   * GET /api/v1/businesses/:businessId route to get reviews for a business.
   */
  describe(`${baseEndpoint}/:businessId/reviews GET business review`, () => {
    beforeEach((done) => {
      Business.create({
        name: 'Andela',
        category: 'GAMING',
        email: 'weather@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'LAGOS',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for affordable prices',
        userId
      })
        .then((business) => {
          businessId = business.id;
          const review = { review: 'Business is so great would like to invest' };
          chai.request(app)
            .post(`${baseEndpoint}/${businessId}/reviews`)
            .send(review)
            .set('authorization', authToken)
            .end((err, res) => {
              businessId2 = res.body.reviewDetails.id;
              done();
            });
        })
        .catch(err => done(err));
    });

    it('should get reviews for a business in the businesses database with the specified id', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/${businessId}/reviews`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Reviews have been found');
          expect(res.body.reviews[0].review).to.equal('Business is so great would like to invest');
          expect(res.body.reviews[0]).to.have.property('responses');
          done();
        });
    });

    it('should return a message if business is not found in the database', (done) => {
      chai.request(app)
        .get(`${baseEndpoint}/faf79f92-fab6-4c45-9519-38f6564c3711/reviews`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Business does not exist, Enter id for existing business');
          done();
        });
    });

    it('should return a message if no reviews have been added for that business', (done) => {
      BusinessReview.destroy({ where: { id: businessId2 } });
      chai.request(app)
        .get(`${baseEndpoint}/${businessId}/reviews`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('No review added');
          done();
        });
    });

    it('should add responses to a review with the particular id', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}/${businessId}/reviews/${businessId2}`)
        .send({ message: 'Nice Stuff' })
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Response submitted');
          done();
        });
    });

    it('catch validation errors while adding responses to a review with the particular id', (done) => {
      chai.request(app)
        .post(`${baseEndpoint}/${businessId}/reviews/${businessId2}`)
        .send({ message: 'B' })
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Response should be more than 1 and not greater than 500 characters');
          done();
        });
    });
  });

  /*
   * PUT /api/v1/businesses/:businessId route to update a business.
   */
  describe(`${baseEndpoint}/:businessId UPDATE businesses`, () => {
    beforeEach((done) => {
      Business.create({
        name: 'Andela',
        category: 'GAMING',
        email: 'weather@yahoo.com',
        telephoneNumber: '07011041032',
        homeNumber: '08011031456',
        location: 'LAGOS',
        address: '7,Adeba Road Lakowe Lagos',
        description: 'Rent houses here for affordable prices',
        userId
      })
        .then((business) => {
          businessId = business.id;
          done();
          // const review = { review: 'Business is so great would like to invest' };
          // chai.request(app)
          //   .post(`${baseEndpoint}/${businessId}/reviews`)
          //   .send(review)
          //   .set('authorization', authToken)
          //   .end((err, res) => {
          //     businessId2 = res.body.reviewDetails.id;
          //   });
        })
        .catch(err => done(err));
    });

    it('should update a business with the specified id', (done) => {
      chai.request(app)
        .put(`${baseEndpoint}/${businessId}`)
        .send({ name: 'Swift' })
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.updatedBusinessDetails.name).to.equal('Swift');
          done();
        });
    });

    it('catches validation erros before updating a business', (done) => {
      chai.request(app)
        .put(`${baseEndpoint}/${businessId}`)
        .send({ name: 'S' })
        .set('authorization', authToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.validationErrors[0]).to.equal('Please provide a business name with atleast 5 and not more than 50 characters');
          done();
        });
    });
  });
});
