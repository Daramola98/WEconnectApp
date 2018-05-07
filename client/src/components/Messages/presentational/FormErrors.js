import React from 'react';
import PropTypes from 'prop-types';
import Errors from './Errors';

const FormErrors = props => (
    <div>
      {props.errors.message ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  {props.errors.message.map((error, i) => (
                    <Errors key={`error${i}`} message={error} index={i} />
                  ))}
                </ul> : null}
              {props.errors.conflict ? <ul className="collection with-header">
                  <li key="header" className="collection-header">
                    <h4 className="red-text">Something Went Wrong</h4>
                  </li>
                  <li key="conflict" className="collection-item">
                    <span className="red-text">{props.errors.conflict}</span>
                  </li>
                </ul> : null}
    </div>
);

export default FormErrors;

FormErrors.propTypes = {
  errors: PropTypes.object.isRequired,
};
