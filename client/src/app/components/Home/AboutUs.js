import React from 'react';

/**
 *
 *@class AboutUs
 *@classdesc creates a React component- AboutUs
 */
export default class AboutUs extends React.Component {
  /**
       * Creates a React Component
       * @return {jsx} renders a react component
       * @memberof React Component
       */
  render() {
    return (
    <div>
    <div className="center-align">
                <h4>About WECONNECT</h4>
    </div>
       WeConnect provides a platform that brings businesses and individuals together.
       This platform creates awareness for businesses
       and gives the users the ability to write reviews about the
       businesses they have interacted with.
    </div>
    );
  }
}
