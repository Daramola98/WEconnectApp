import React from 'react';
import { Link } from 'react-router-dom';

const Review = props => (
  <li>
    <i className="material-icons prefix">account_circle</i>
      <span>{props.review.userId}</span>
    <p>
      {props.review.review}
    </p>
    <div className="align-right"><span className="blue-text"><u>Reply</u></span></div>
    <hr/>
  </li>
);

export default Review;
