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
import QuoteStyledButton from 'components/Button/QuoteStyledButton';

export class Landing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="img-wrapper">
        <img className="img-responsive bg" alt="bg-img" src={image} />
        <div className="img-overlay">
          <img src={logo} alt="logo" />
        </div>
        <div className="img-overlay">
          <QuoteStyledButton> Get a quote </QuoteStyledButton>
        </div>
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
