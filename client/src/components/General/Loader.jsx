import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size }) => (
  <div>
    <img src="/images/loader.gif" alt="loader"
      style= {{
        width: size,
        position: 'relative',
        top: 30,
        bottom: 0,
        right: 0,
        left: 250,
        margin: 'auto'
      }}/>
  </div>
);

Loader.propTypes = {
  size: PropTypes.string
};

export default Loader;
