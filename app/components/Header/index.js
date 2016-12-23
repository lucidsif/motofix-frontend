import React from 'react';
//import { FormattedMessage } from 'react-intl';

// import A from './A';
// import Img from './Img';
//import NavBar from './NavBar';
// import HeaderLink from './HeaderLink';
// import Banner from './banner.jpg';
// import messages from './messages';
import AppNavBar from 'components/Navbar'

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <AppNavBar />
      </div>
    );
  }
}

export default Header;
