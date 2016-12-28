/*
 *
 * QuoteAddVehicle
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteAddVehicle from './selectors';

export class QuoteAddVehicle extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        balls
      </div>
    );
  }
}

const mapStateToProps = selectQuoteAddVehicle();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteAddVehicle);
