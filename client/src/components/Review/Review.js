import React from 'react';
import { Link } from 'react-router-dom';

const Review = props => (
  <li>
    <i className="material-icons prefix">account_circle</i>
    <a href="userProfile.html">
      <span>{props.userId}</span>
    </a>
    <p>
      {props.review}
    </p>
    <hr/>
  </li>
);

export default Review;
