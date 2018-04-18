import axios from 'axios';
import { POST_REVIEW, FETCH_BUSINESS_REVIEWS, POST_REVIEW_RESPONSE } from './actionTypes';

export const postsReview = () => ({
  type: POST_REVIEW
});

export const postsReviewResponse = () => ({
  type: POST_REVIEW_RESPONSE
});

export const fetchBusinessReviews = reviews => ({
  type: FETCH_BUSINESS_REVIEWS,
  reviews
});

export const postReview = (businessId, review) => dispatch =>
  axios.post(`api/v1/businesses/${businessId}/reviews`, review)
    .then((response) => {
      dispatch(postsReview());
    });

export const postReviewResponse = (businessId, reviewId, review) => dispatch =>
  axios.post(`api/v1/businesses/${businessId}/reviews/${reviewId}`, review)
    .then((response) => {
      dispatch(postsReviewResponse());
    });

export const fetchReviews = businessId => dispatch =>
  axios.get(`api/v1/businesses/${businessId}/reviews`)
    .then((response) => {
      dispatch(fetchBusinessReviews(response.data.reviews));
    })
    .catch((error) => {
      if (error) {
        Promise.reject(error.response.data.message);
      }
    });

