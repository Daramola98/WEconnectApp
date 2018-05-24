import React from 'react';
import { Link } from 'react-router-dom';
import { SideNav, SideNavItem, Button, Navbar, Dropdown, NavItem } from 'react-materialize';

const UserNavBar = props => (
  <div>
    <nav className="blue-grey darken-3">
      <div className="nav-wrapper">
        <div className="">
          <Link to="/" className="brand-logo">
            WEconnect
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/userProfile">Home</Link>
            </li>
            <li>
              <Link to="/registerBusiness">Register Business</Link>
            </li>
            <li>
              <Dropdown
                trigger={
                  <Button className="dropdown-button btn transparent">
                    Account
                  </Button>
                }
              >
                <ul id="dropdown1">
                  <li>
                    <Link to="/updateUserProfile">Edit Profile</Link>
                  </li>
                  <NavItem divider />
                  <li>
                    <Link id="logout1" to="/" onClick={() => props.logout()}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </Dropdown>
            </li>
            <li>
              <Link to="/businessListing">Business Listing</Link>
            </li>
            <li>
              <Link id="logout2" to="/" onClick={() => props.logout()}>
                Logout
              </Link>
            </li>
          </ul>
          <SideNav
            trigger={
              <Link to="#" className="button-collapse">
                <i className="material-icons">menu</i>
              </Link>
            }
            options={{ closeOnClick: true }}
          >
            <SideNavItem
              userView
              user={{
                background:
                  'https://i.ytimg.com/vi/yqXC4wlIAbI/maxresdefault.jpg',
                name: props.firstname,
                email: props.email
              }}
            />
            <ul>
              <li>
                <Link to="/userProfile">Home</Link>
              </li>
              <li>
                <Link to="/registerBusiness">Register Business</Link>
              </li>
              <li>
                <Link to="/updateUserProfile">Edit Profile</Link>
              </li>
              <SideNavItem divider />
              <SideNavItem subheader>Businesses</SideNavItem>
              <li>
                <Link to="/businessListing">Business Listing</Link>
              </li>
              <SideNavItem divider />
              <li>
                <Link id="logout3" to="/" onClick={() => props.logout()}>
                  Logout
                </Link>
              </li>
            </ul>
          </SideNav>
        </div>
      </div>
    </nav>
  </div>
);

export default UserNavBar;
