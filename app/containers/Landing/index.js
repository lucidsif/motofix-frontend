/*
 *
 * Landing
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import LandingLogo from 'components/BackgroundImg/LandingLogo';
import logo from 'components/BackgroundImg/logo@2x.png';
import BgImgDiv from 'components/BackgroundImg/BgImgDiv';

export class Landing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <BgImgDiv>
        <LandingLogo src={logo} alt="landing page logo" />
          Landing page here
        <button className="btn btn-primary"> Get a free quote </button>
      </BgImgDiv>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Landing);
