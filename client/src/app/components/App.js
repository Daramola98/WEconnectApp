import React from 'react';
import Header from './Container/Header';
import Home from './Home/Home';
import HomeSlider from './Home/HomeImageSlider';
import style from '../../styles/index.css';

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
        <div>
        <Header/>
        </div>
        <HomeSlider/>
        <Home/>
        </div>
    );
  }
}

export default App;

