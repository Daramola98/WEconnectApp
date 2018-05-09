import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

const Review = props => (
  <li>
    <i className="material-icons prefix">account_circle</i>
      <span className="blue-text reviewerId">{props.review.reviewer}</span>
    <p>
      {props.review.review} <span className="timestamp align-right">{moment(props.review.createdAt).calendar()}</span>
    </p>
    {props.children}
    <hr/>
  </li>
);

export default Review;

Review.propTypes = {
  review: PropTypes.object.isRequired,
};

