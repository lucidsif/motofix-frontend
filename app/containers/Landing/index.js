/*
 *
 * Landing
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import logo from './logo.png';
import image from './motowoman.png';
import { Button } from 'semantic-ui-react';

// TODO: convert to functional component

export class Landing extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="img-wrapper">
        <img className="img-responsive bg" alt="bg-img" src={image} />
        <div className="img-overlay-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="img-overlay-button">
          <Button onClick={() => browserHistory.push('/quote/vehicle')} primary size="large">
            Get a Free Quote
          </Button>
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
