import db from '../models/index';

const { Business, BusinessReview, User } = db;

export default {
  resetBusinessDatabase() {
    return Business.truncate();
  },
  resetBusinessReviewDatabase() {
    return BusinessReview.truncate();
  },
  resetUserReviewDatabase() {
    return BusinessReview.truncate();
  },
  syncBusinessDatabase() {
    return Business.sync({ force: true });
  },
  syncBusinessReviewDatabase() {
    return BusinessReview.sync({ force: true });
  },
  syncUserReviewDatabase() {
    return BusinessReview.sync({ force: true });
  },
};
