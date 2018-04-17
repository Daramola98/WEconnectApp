import axios from 'axios';
import { POST_REVIEW, FETCH_BUSINESS_REVIEWS } from './actionTypes';

export const postsReview = () => ({
  type: POST_REVIEW
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

export const fetchReviews = businessId => dispatch =>
  axios.get(`api/v1/businesses/${businessId}/reviews`)
    .then((response) => {
      dispatch(fetchBusinessReviews(response.data.reviews));
    });

