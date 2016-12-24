/*
 *
 * Landing
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import LandingLogo from 'components/BackgroundImg/LandingLogo';
import logo from 'components/BackgroundImg/logo@2x.png';

export class Landing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="background-img">
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
