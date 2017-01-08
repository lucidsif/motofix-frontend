/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
import { compose } from 'react-apollo';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';

import { addToCart, removeFromCart } from './actions';

import { createStructuredSelector } from 'reselect';
import { selectCart, selectEstimate } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';

import * as queries from './queries';

// TODO: 8/10 restructure service arr (in reducers and props so non-spaced keys are used instead'
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

// Why is it replacing labortime?
// what happens if there is no queryResult.response?
function mapDispatchToProps(dispatch) {
  return {
    onCartClick: (service, queryResult) => {
      console.log(service, queryResult);
      const responseObj = JSON.parse(queryResult.response)
      const laborTime = responseObj.time
      const serviceObj = {[service]: {selected: true, laborTime, laborPrice: null } };
      console.log(serviceObj);
      dispatch(addToCart(serviceObj));
    },
    onTrashClick: (service) => {
      const serviceObj = {[service]: {selected: false, laborPrice: null } };
      console.log(serviceObj);
      dispatch(removeFromCart(serviceObj));
    },
  };
}

export default compose(
  queries.withOilChangeData,
  queries.withWinterizationData,
  connect(mapStateToProps, mapDispatchToProps)
)(QuoteCentral);

// ESLint
//
