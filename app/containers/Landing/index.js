/*
 *
 * Landing
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import BackgroundImg from 'components/BackgroundImg/BackgroundImg';
import LandingLogo from 'components/BackgroundImg/LandingLogo';
import motowoman from 'components/BackgroundImg/motowoman.png';
import logo from 'components/BackgroundImg/logo@2x.png';
import Button from 'components/Button';

export class Landing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <LandingLogo src={logo} alt="landing page logo" />
        <div className="background-img-div">
          <BackgroundImg className="background-img" src={motowoman} alt="landing page background image" />
        </div>
          Landing page here
        <Button> Get a free quote </Button>
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
