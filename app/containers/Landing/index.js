/*
 *
 * Landing
 *
 */
import React from 'react';
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
          <Button circular color="orange" onClick={() => browserHistory.push('/quote/vehicle')} size="huge">
            Get a free quote
          </Button>
        </div>
      </div>
    );
  }
}

export default Landing;
