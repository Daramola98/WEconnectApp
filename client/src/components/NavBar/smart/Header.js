import React from 'react';
import GuestNavBar from '../presentational/GuestNavBar';
import UserNavBar from '../presentational/UserNavBar';

/**
 *
 *@class Header
 *@classdesc creates a React component- Header
 */
export default class Header extends React.Component {
  /**
   * Creates a React Component
   * @return {jsx} Success message with the business created or error message
   * @memberof React Component
   */
  render() {
    const { firstname, email } = this.props.usersReducer.user;

    return (
        <div>
        <header>
        <div>
          {this.props.usersReducer.authenticated ? <UserNavBar
          firstname ={firstname}
          email={email}
          logout={this.props.logout}
          />
           : <GuestNavBar/>}
        </div>
    </header>
    <main className="container">
        {this.props.children}
    </main>
    </div>
    );
  }
}
