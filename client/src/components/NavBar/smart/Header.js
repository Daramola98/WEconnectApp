import React from 'react';
import GuestNavBar from '../presentational/GuestNavBar';
import UserNavBar from '../presentational/UserNavBar';

/**
 * Class Representing React Component Header
 *@class Header
 *@classdesc creates a React component- Header
 */
export default class Header extends React.Component {
  /**
    * Renders the Header Component
    * @return {jsx} jsx element to render
    * @memberof Header Component
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
    </div>
    );
  }
}
