/*
 *
 * Landing
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import LandingLogo from 'components/BackgroundImg/LandingLogo';
import logo from 'components/BackgroundImg/logo@2x.png';
import image from './motowoman.png';
import Img from 'components/Img/index';

export class Landing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      <Img src={image} />
        <LandingLogo src={logo} alt="landing page logo" />
          Landing page here
        <button className="btn btn-primary"> Get a free quote </button>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Landing);
/*
.background-img{
  background: url('./motowoman.png') no-repeat center center fixed;
  background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -webkit-background-size: cover;
}
*/
