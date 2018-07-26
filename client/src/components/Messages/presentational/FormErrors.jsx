import React from 'react';
import PropTypes from 'prop-types';
import Errors from './Errors.jsx';

const FormErrors = (props) => {
  const { errors } = props;
  return (
    <div>
      {props.errors.message ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  {errors.message.map((error, i) => (
                    <Errors key={`error${i}`} message={error} index={i} />
                  ))}
                </ul> : null}
              {errors.conflict ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  <li key="conflict" className="collection-item">
                    <span className="red-text">{errors.conflict}</span>
                  </li>
                </ul> : null}
    </div>
  );
};

export default FormErrors;

FormErrors.propTypes = {
  errors: PropTypes.object.isRequired,
};
