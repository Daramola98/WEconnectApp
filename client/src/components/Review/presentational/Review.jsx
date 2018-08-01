import React from 'react';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

const Review = (props) => {
  const { userId } = props;
  const {
    reviewerId, id, reviewer, rating, createdAt, review
  } = props.review;
  return (
  <li className="collection-item">
    {userId === reviewerId && <span className="review-controls">
      <i id="edit" onClick={() => {
        props.setReviewId(id);
        $('#editReview').modal('open');
         }} className="material-icons blue-text">edit</i> <i id="delete" onClick={() => {
           props.setReviewId(id);
           $('#deleteReview').modal('open');
            }} className="material-icons red-text">delete</i>
    </span>}
      <img src="/images/userplaceholder.png" style={{ height: '42px', width: '42px' }} alt="picture" className="circle" />
      <span className="title blue-grey-text darken-2 reviewerId">{reviewer.username}</span>
      <div id="review-business">
      <span id="ratingdisplay"><ReactStars count={5}
          size={15}
          half={true}
          edit={false}
          color2={'#ffd700'}
          value={Number(rating)} /></span> <span className="timestamp align-right">{moment(createdAt).calendar()}</span>
          <br/>
        {review}
      </div>
      {props.children}
  </li>
  );
};

export default Review;

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

