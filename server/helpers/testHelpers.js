import db from '../models/index';

const { Business, BusinessReview, User } = db;

export default {
  resetBusinessDatabase(done) {
    return Business.truncate()
      .then(() => done())
      .catch(err => done(err));
  },
  resetBusinessReviewDatabase(done) {
    return BusinessReview.truncate()
      .then(() => done())
      .catch(err => done(err));
  },
  resetUserDatabase(done) {
    return User.truncate()
      .then(() => done())
      .catch(err => done(err));
  },
  syncBusinessDatabase(done) {
    return Business.sync({ force: true })
      .then(() => done())
      .catch(err => done(err));
  },
  syncBusinessReviewDatabase(done) {
    return BusinessReview.sync({ force: true })
      .then(() => done())
      .catch(err => done(err));
  },
  syncUserDatabase(done) {
    return User.sync({ force: true })
      .then(() => done())
      .catch(err => done(err));
  },
};
