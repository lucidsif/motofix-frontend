/*
 *
 * QuoteContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';
import { Grid, Segment } from 'semantic-ui-react';
import QuoteProgressBar from 'components/QuoteProgressBar';


export class QuoteContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Grid centered>
        <QuoteProgressBar currentLocation={this.props.location.pathname} selectedVehicle={this.props.vehicle} />
        <Segment attached="bottom" textAlign="center">
          {this.props.children}
        </Segment>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
});

export default connect(mapStateToProps, null)(QuoteContainer);
