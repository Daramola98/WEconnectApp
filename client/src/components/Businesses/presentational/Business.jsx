import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Business = props => (
  <div className="col s12 m12 l4">
      <div className="card hoverable">
        <div className="card-image">
          <img className="responsive" src={props.business.businessImage} alt="business" />
          <span className="card-title"></span>
        </div>
        <div className="card-content">
          <p className="truncate">Business Name: {props.business.name} </p>
          <p className="truncate">Location: {props.business.location} </p>
          <p className="truncate">Category: {props.business.category} </p>
        </div>
        <div className="card-action">
          <Link className="blue-grey-text darken-2" to={`/businessProfile/${props.business.id}`}>View</Link>
          {props.children}
        </div>
      </div>
  </div>
);

export default Business;

Business.propTypes = {
  business: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

