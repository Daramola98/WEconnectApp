import React from 'react';
import PropTypes from 'prop-types';

const Errors = (props) => {
  const { index, message } = props;
  return (
     <li key={index} className="collection-item red-text">{message}</li>
  );
};

export default Errors;

Errors.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
