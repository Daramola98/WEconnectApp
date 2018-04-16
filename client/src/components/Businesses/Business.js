import React from 'react';
import { Link } from 'react-router-dom';

const Business = props => (
    <tr>
        <td>{props.business.name}</td>
        <td>{props.business.category}</td>
        <td>{props.business.location}</td>
        <td key={props.business.id}><Link to={`/businessProfile${props.business.id}`}>View</Link></td>
        {props.children}
    </tr>
);

export default Business;
