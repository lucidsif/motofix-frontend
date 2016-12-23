/**
*
* Navbar
*
*/

import React from 'react';
import { Link } from 'react-router';

const NavbarItem = ({ children, to }) => (
  <li className="nav-item">
    <Link className="nav-link" to={to}>{children}</Link>
  </li>
);

const AppNavbar = ({ authenticated, signOut, user }) => (
  <nav className="navbar navbar-fixed-top navbar-dark bg-primary">
    <Link className="navbar-brand" to="/products">motofix</Link>
    <ul className="nav navbar-nav">
      <NavbarItem to="/products">Products</NavbarItem>
      <NavbarItem to="/orders">Orders</NavbarItem>
    </ul>
  </nav>
);

export default AppNavbar;
