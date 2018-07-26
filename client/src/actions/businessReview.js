import axios from 'axios';
import { POST_REVIEW, UPDATE_REVIEW, DELETE_REVIEW, FETCH_BUSINESS_REVIEWS, POST_REVIEW_RESPONSE, FETCH_BUSINESS_REVIEWS_FAILED } from './actionTypes';

/**
   * Creates postReview action
   * @return {object} action - The postreview action object
   * @memberof reviewActions
   */
export const postsReview = () => ({
  type: POST_REVIEW
});

/**
   * Creates updateReview action
   * @return {object} action - The updatereview action object
   * @memberof reviewActions
   */
export const updatesReview = () => ({
  type: UPDATE_REVIEW
});

/**
   * Creates deleteReview action
   * @return {object} action - The deleteReview action object
   * @memberof reviewActions
   */
export const deletesReview = () => ({
  type: DELETE_REVIEW
});

/**
   * Creates postReviewResponse action
   * @return {object} action - The postreviewresponse action object
   * @memberof reviewActions
   */
export const postsReviewResponse = () => ({
  type: POST_REVIEW_RESPONSE
});

/**
   * Creates fetchBusinessReview action
   * @param {array} reviews - the reviews
   * @param {number} reviewsCount - The number of reviews a business has
   * @return {object} action - The fetchbusinessreviews action object
   * @memberof reviewActions
   */
export const fetchBusinessReviews = (reviews, reviewsCount) => ({
  type: FETCH_BUSINESS_REVIEWS,
  reviews,
  reviewsCount
});

/**
   * Creates fetchBusinessReviewsFailed action
   * @return {object} action - The fetchBusinessReviewsFailed action object
   * @memberof reviewActions
   */
export const fetchBusinessReviewsFailed = () => ({
  type: FETCH_BUSINESS_REVIEWS_FAILED,
});


/**
   * Action creator for postReview action
   * @param {string} businessId - The businessId of the business to review
   * @param {object} review - The review information
   * @return {object} dispatches the postReview action
   * @memberof reviewActions
   */
export const postReview = (businessId, review) => dispatch =>
  axios.post(`/api/v1/businesses/${businessId}/reviews`, review)
    .then((response) => {
      dispatch(postsReview());
    });

/**
   * Action creator for updateReview action
   * @param {string} businessId - The businessId of the business to review
   * @param {string} reviewId - The reviewId to update
   * @param {object} review - The review information
   * @return {object} dispatches the updateReview action
   * @memberof reviewActions
   */
export const updateReview = (businessId, reviewId, review) => dispatch =>
  axios.put(`/api/v1/businesses/${businessId}/reviews/${reviewId}`, review)
    .then((response) => {
      dispatch(updatesReview());
    });

/**
   * Action creator for deleteReview action
   * @param {string} businessId - The businessId of the business to review
   * @param {string} reviewId - The reviewId of review to delete
   * @return {object} dispatches the deleteReview action
   * @memberof reviewActions
   */
export const deleteReview = (businessId, reviewId) => dispatch =>
  axios.delete(`/api/v1/businesses/${businessId}/reviews/${reviewId}`)
    .then((response) => {
      dispatch(deletesReview());
    });

/**
   * Action creator for postReviewResponse action
   * @param {string} businessId - The businessId of the business to review
   * @param {string} reviewId - The reviewId to post response to
   * @param {object} review - The review information
   * @return {object} dispatches the postReviewResponse action
   * @memberof reviewActions
   */
export const postReviewResponse = (businessId, reviewId, review) => dispatch =>
  axios.post(`/api/v1/businesses/${businessId}/reviews/${reviewId}`, review)
    .then((response) => {
      dispatch(postsReviewResponse());
    });

/**
   * Action creator for fetchReviews action
   * @param {string} businessId - The businessId of the business to review
   * @param {number} pageNumber - The pageNumber to fetch
   * @return {object} dispatches the fetchReviews action
   * @memberof reviewActions
   */
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

