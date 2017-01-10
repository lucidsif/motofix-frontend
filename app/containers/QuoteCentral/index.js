/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
//import { compose } from 'react-apollo';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';

import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';

import { addToCart, removeFromCart, setLaborTime } from './actions';

import { createStructuredSelector } from 'reselect';
import { selectCart, selectEstimate } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';

//import * as queries from './queries';

// TODO: 7.5/10 Create the price breakdown component
// TODO: 6.5/10 add conditional rendering: if no vehicle => route back to select vehicle
// TODO: 6/10 make sure the onclick handler for the back button isn't being recreated on every rerender
// TODO: 5.5/10 route back buttom backwards instead of to a specific point
// TODO: 5/10 modularize queries completely with single import

export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // console.log(this.props.vehicle);
    // console.log(this.props.cart);
    // console.log(this.props.estimate);
    // console.log(this.props.oilChange);
    // console.log(this.props.winterization)
    return (
      <div>
        <QuoteCart props={this.props} />
        <AddServices props={this.props} />
        <Grid.Row>
          <Button floated="right" color="teal">Next</Button>
          <Button onClick={() => browserHistory.push('/quote/vehicle')} floated="right">Back</Button>
        </Grid.Row>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
  cart: selectCart(),
  estimate: selectEstimate(),
});
// what happens if there is no serviceQuery.response or it fails?
// mutate props of service to true
function mapDispatchToProps(dispatch) {
  return {
    onCartClick: (service) => {
      dispatch(addToCart(service));
    },
    onTrashClick: (service) => {
      dispatch(removeFromCart(service));
    },
    onQueryLoad: (service, laborTime) => {
      dispatch(setLaborTime(service, laborTime));
    }
  };
}

// order matters, connect must come first for the graphql containers to be able to access the props
/*
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  queries.AccessoryInstallationData,
  queries.AirFilterReplacementData,
  queries.BrakePadReplacementData,
  queries.BrakesSqueakingData,
  queries.ChainSprocketReplacementData,
  queries.CheckEngineFIData,
  queries.CleanLubeChainData,
  queries.FluidsLeakingData,
  queries.MotorcycleNotStartingData,
  queries.MotorcycleOverheatingData,
  queries.NyStateInspectionData,
  queries.OilChangeData,
  queries.PrepurchaseInspectionData,
  queries.SmokeOrSteamData,
  queries.SpongyBrakingData,
  queries.SuspensionTuningData,
  queries.TireReplacementData,
  queries.ValveAdjustmentData,
  queries.WarningLightData,
  //queries.WinterizationData,
)(QuoteCentral);
*/
QuoteCentral = connect(mapStateToProps, mapDispatchToProps)(QuoteCentral);

QuoteCentral = withApollo(QuoteCentral);

export default QuoteCentral;

// ESLint
//
