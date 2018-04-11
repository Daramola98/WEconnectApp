import React from 'react';

const Errors = props => (
     <li key={props.key} className="collection-item red-text">{props.message}</li>
);

export default Errors;
