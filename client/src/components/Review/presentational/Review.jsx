import React from 'react';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

const Review = props => (
  <li className="collection-item">
    {props.userId === props.review.reviewerId && <span className="review-controls">
      <i onClick={() => {
        props.setReviewId(props.review.id);
        $('#editReview').modal('open');
         }} className="material-icons blue-text">edit</i> <i onClick={() => {
           props.setReviewId(props.review.id);
           $('#deleteReview').modal('open');
            }} className="material-icons red-text">delete</i>
    </span>}
      <img src="/images/userplaceholder.png" style={{ height: '42px', width: '42px' }} alt="picture" className="circle" />
      <span className="title blue-grey-text darken-2 reviewerId">{props.review.reviewer.username}</span>
      <div id="review-business">
      <span id="ratingdisplay"><ReactStars count={5}
          size={15}
          half={true}
          edit={false}
          color2={'#ffd700'}
          value={Number(props.review.rating)} /></span> <span className="timestamp align-right">{moment(props.review.createdAt).calendar()}</span>
          <br/>
        {props.review.review}
      </div>
      {props.children}
  </li>
);

export default Review;

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

