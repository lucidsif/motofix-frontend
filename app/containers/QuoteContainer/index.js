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

QuoteContainer.propTypes = {
  location: React.PropTypes.object,
  vehicle: React.PropTypes.object,
  children: React.PropTypes.object,
};

export default connect(mapStateToProps, null)(QuoteContainer);

/*
 <Card centered>
 <Card.Content>
 <Image floated='right' size='mini' src='http://semantic-ui.com/images/avatar/large/steve.jpg' />
 <Card.Meta>
 Get $10, Give $10
 </Card.Meta>
 <Card.Description>
 For every rider you refer who orders a service, both of you will get $10.
 </Card.Description>
 </Card.Content>
 </Card>
 */