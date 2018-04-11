import React from 'react';
import Header from './NavBar/Header';

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
        <Header/>
        {this.props.children}

    </div>
    );
  }
}

export default App;

