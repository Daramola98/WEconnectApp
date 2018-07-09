import React from 'react';
import { Link } from 'react-router-dom';
import { SideNav, SideNavItem, Button, Navbar, Dropdown, NavItem } from 'react-materialize';

const GuestNavBar = props => (
  <nav className="blue-grey darken-2">
    <div className="nav-wrapper">
      <div className="">
        <Link to="/" className="brand-logo">
         <img className="logo" src="/images/logo.png"/>
        </Link>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/aboutUs">About Us</Link>
          </li> */}
          <li>
            <Link to="/contactUs">Contact Us</Link>
          </li>
          {/* <li>
            <Link to="/howitworks">How it Works</Link>
          </li> */}
          <li>
            <Link to="/login">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/businessListing">Business Listing</Link>
          </li>
        </ul>
        <SideNav
          trigger={
            <a href="" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
          }
          options={{ closeOnClick: true }}
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/aboutUs">About Us</Link>
            </li> */}
            <li>
              <Link to="/contactUs">Contact Us</Link>
            </li>
            {/* <li>
              <Link to="/howitworks">How it Works</Link>
            </li> */}
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <SideNavItem divider />
            <SideNavItem subheader>Businesses</SideNavItem>
            <li>
              <Link to="/businessListing">Business Listing</Link>
            </li>
          </ul>
        </SideNav>
      </div>
    </div>
  </nav>
);

export default GuestNavBar;
