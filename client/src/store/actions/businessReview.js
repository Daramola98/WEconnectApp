import axios from 'axios';
import { POST_REVIEW, FETCH_BUSINESS_REVIEWS, POST_REVIEW_RESPONSE, FETCH_BUSINESS_REVIEWS_FAILED } from './actionTypes';

export const postsReview = () => ({
  type: POST_REVIEW
});

export const postsReviewResponse = () => ({
  type: POST_REVIEW_RESPONSE
});

export const fetchBusinessReviews = (reviews, reviewsCount) => ({
  type: FETCH_BUSINESS_REVIEWS,
  reviews,
  reviewsCount
});

export const fetchBusinessReviewsFailed = () => ({
  type: FETCH_BUSINESS_REVIEWS_FAILED,
});

export const postReview = (businessId, review) => dispatch =>
  axios.post(`/api/v1/businesses/${businessId}/reviews`, review)
    .then((response) => {
      dispatch(postsReview());
    });

export const postReviewResponse = (businessId, reviewId, review) => dispatch =>
  axios.post(`/api/v1/businesses/${businessId}/reviews/${reviewId}`, review)
    .then((response) => {
      dispatch(postsReviewResponse());
    });

export const fetchReviews = (businessId, pageNumber) => dispatch =>
  axios.get(`/api/v1/businesses/${businessId}/reviews?pageNumber=${pageNumber}`)
    .then((response) => {
      dispatch(fetchBusinessReviews(response.data.reviews, response.data.reviewsCount));
    })
    .catch((error) => {
      if (error) {
        dispatch(fetchBusinessReviewsFailed());
      }
    });

