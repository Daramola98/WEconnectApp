import React from 'react';
import { Link } from 'react-router-dom';

const Review = props => (
  <li>
    <i className="material-icons prefix">account_circle</i>
      <span className="blue-text reviewerId">{props.review.reviewer}</span>
    <p>
      {props.review.review}
    </p>
    {props.children}
    <hr/>
  </li>
);

export default Review;
