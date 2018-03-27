import React from 'react';
import Header from './Container/Header';
import Home from './Home/Home';
import RegisterBusiness from './Business/RegisterBusiness';

import HomeImageSlider from './Home/HomeImageSlider';

/**
 *
 *@class App
 *@classdesc creates a React component- App
 */
class App extends React.Component {
/**
   * Creates a React Component
   * @return {jsx} Success message with the business created or error message
   * @memberof React Component
   */
  render() {
    return (
    <div>
       <HomeImageSlider/>
       <Home/>
    </div>
    );
  }
}

export default App;

