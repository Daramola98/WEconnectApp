import React from 'react';
import PropTypes from 'prop-types';

const Errors = props => (
     <li key={props.index} className="collection-item red-text">{props.message}</li>
);

export default Errors;

Errors.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
