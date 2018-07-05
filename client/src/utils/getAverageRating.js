/**
   * Calculate Average rating for business
   * @param {object} reviews - The reviews for the business
   * @return {number} averageRating - The average rating for the business
   * @memberof BusinessHelper
   */
const getAverageRating = (reviews) => {
  if (reviews.length === 0) {
    return 0;
  }
  const ratings = [];
  reviews.forEach((review) => {
    ratings.push(review.rating);
  });
  const averageRating = ratings
    .reduce((aggregate, currentValue) => aggregate + currentValue) / reviews.length;
  return averageRating.toFixed(1);
};

export default getAverageRating;
