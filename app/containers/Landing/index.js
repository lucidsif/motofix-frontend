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
      <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-4 col-xs-12 ">
          <button className="btn btn-primary"> Get a quote </button>
        </div>
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
