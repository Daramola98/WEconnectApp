import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Business = props => (
    <tr>
        <td>{props.business.name}</td>
        <td>{props.business.category}</td>
        <td>{props.business.location}</td>
        <td key={props.business.id}><Link to={`/businessProfile/${props.business.id}`}>View</Link></td>
        {props.children}
    </tr>
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
