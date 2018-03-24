import React from 'react';

/**
 *
 *@class Header
 *@classdesc creates a React component- Header
 */
export default class HomeImageSlider extends React.Component {
  /**
   * Creates a React Component
   * @return {jsx} Success message with the business created or error message
   * @memberof React Component
   */
  render() {
    return (
        <div className="slider">
            <ul className="slides">
                <li>
                    <img className="responsive-img" src="../images/growing-business.jpg"/>
                </li>
                <li>
                    <img className="responsive-img" style={{ width: `${100}%vw` }} src="../images/business.jpeg"/>
                    <div className="caption left-align">
                        <h5 className="text-align-left blue-text">Connect your business with our various users</h5>
                    </div>
                </li>
            </ul>
        </div>
    );
  }
}
