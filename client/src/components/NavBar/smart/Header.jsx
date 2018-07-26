import React from 'react';
import PropTypes from 'prop-types';
import GuestNavBar from '../presentational/GuestNavBar.jsx';
import UserNavBar from '../presentational/UserNavBar.jsx';

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
    const { user, authenticated } = this.props.usersReducer;
    const { firstname, email } = user;
    return (
        <div>
        <header>
        <div>
          {authenticated ? <UserNavBar
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

Header.propTypes = {
  usersReducer: PropTypes.object.isRequired
};
