import chai from 'chai';
import bcrypt from 'bcrypt';
import db from '../../models/index';

const { expect } = chai;
const { Business, User, BusinessReview } = db;
let userId, businessId, reviewerId;

describe('BusinessReview Model', () => {
  beforeEach((done) => {
    db.sequelize.sync({ force: true }) // drops table and re-creates it
      .then(() => {
        const userDetails = {
          firstname: 'Damilola',
          lastname: 'Ajiboye',
          email: 'damilolaajiboye@live.com',
          password: bcrypt.hashSync('dammyro100', bcrypt.genSaltSync(10)),
          telephoneNumber: '070664455523',
          homeNumber: '08043553081',
        };
        User.create(userDetails)
          .then((user) => {
            userId = user.id;
            reviewerId = user.id;
            const businessDetails = {
              name: 'Clash of clans',
              email: 'damilolaajiboye@live.com',
              location: 'LAGOS',
              category: 'GAMING',
              description: 'Game for collaboration',
              address: '23,Adeba Ibeju Lekki LAGOS',
              telephoneNumber: '07066445523',
              homeNumber: '08043553081',
              userId
            };
            Business.create(businessDetails)
              .then((business) => {
                businessId = business.id;
                done();
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => Promise.reject(done(err)));
  });

  describe('create', () => {
    it('creates a new business review', (done) => {
      const reviewDetails = {
        reviewerId,
        businessId,
        review: 'Nice Business'
      };
      BusinessReview.create(reviewDetails)
        .then((review) => {
          expect(review.review).to.equal('Nice Business');
          done();
        });
    });
  });

  describe('finds business reviews', () => {
    beforeEach((done) => {
      const reviewDetails = {
        reviewerId,
        businessId,
        review: 'Nice Business'
      };
      const reviewDetails2 = {
        reviewerId,
        businessId,
        review: 'Bad Business'
      };
      BusinessReview.create(reviewDetails)
        .then((review) => {
          BusinessReview.create(reviewDetails2);
          done();
        })
        .catch(err => done(err));
    });

    it('finds one business review', (done) => {
      BusinessReview.findOne({
        where: {
          review: 'Nice Business'
        }
      })
        .then((review) => {
          expect(review).to.be.a('object');
          expect(review.review).to.equal('Nice Business');
          done();
        });
    });

    it('finds all business reviews', (done) => {
      BusinessReview.findAll()
        .then((business) => {
          expect(business).to.be.a('array');
          expect(business[1].review).to.equal('Bad Business');
          done();
        });
    });
  });

  describe('update business reviews', () => {
    beforeEach((done) => {
      const reviewDetails = {
        reviewerId,
        businessId,
        review: 'Nice Business'
      };
      BusinessReview.create(reviewDetails)
        .then((review) => {
          done();
        })
        .catch(err => done(err));
    });

    it('updates a business\'s review', (done) => {
      BusinessReview.findOne({ where: { review: 'Nice Business' } })
        .then((review) => {
          review.update({ review: 'Awesome Business' })
            .then((updatedReview) => {
              expect(updatedReview.review).to.equal('Awesome Business');
              done();
            });
        });
    });
  });

  describe('deletes business reviews', () => {
    beforeEach((done) => {
      const reviewDetails = {
        reviewerId,
        businessId,
        review: 'Nice Business'
      };
      BusinessReview.create(reviewDetails)
        .then((review) => {
          done();
        })
        .catch(err => done(err));
    });

    it('deletes a business review', (done) => {
      BusinessReview.findOne({ where: { review: 'Nice Business' } })
        .then((review) => {
          review.destroy()
            .then((deletedReview) => {
              expect(deletedReview.review).to.equal(undefined);
              done();
            });
        });
    });
  });
});

