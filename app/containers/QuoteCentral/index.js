/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';

import { addToCart, removeFromCart } from './actions';

import { createStructuredSelector } from 'reselect';
import { selectCart, selectEstimate } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';

// TODO: 8.1/10 Modulate the queries/withDatas by moving them to a separate file and importing them
// TODO: 8/10 Create the price breakdown component
// TODO: 6.5/10 add conditional rendering: if no vehicle => route back to select vehicle
// TODO: 6/10 make sure the onclick handler for the back button isn't being recreated on every rerender
// TODO: 5.5/10 route back buttom backwards instead of to a specific point
export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // console.log(this.props.vehicle);
    // console.log(this.props.cart);
    // console.log(this.props.estimate);
    // console.log(this.props.oilChange);
    // console.log(this.props.winterization);
    return (
      <div>
        <QuoteCart estimate={this.props.estimate} oilChange={this.props.oilChange} winterization={this.props.winterization} />
        <AddServices cart={this.props.cart} oilChange={this.props.oilChange} winterization={this.props.winterization} onCartClick={this.props.onCartClick} onTrashClick={this.props.onTrashClick} />
        <Grid.Row>
          <Button floated="right" color="teal">Next</Button>
          <Button onClick={() => browserHistory.push('/quote/vehicle')} floated="right">Back</Button>
        </Grid.Row>
      </div>
    );
  }
}

const OIL_CHANGE_QUERY = gql`
{
  laborEstimates(service: "Oil Change"){
    response
  }
}
`;

const WINTERIZATION_QUERY = gql`
{
  laborEstimates(service: "Winterization"){
    response
  }
}
`;

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
  cart: selectCart(),
  estimate: selectEstimate(),
});

function mapDispatchToProps(dispatch) {
  // ? merge the object?
  return {
    onCartClick: (service) => {
      console.log(service);
      //const appendedObj = obj[service];
      //console.log(appendedObj);
      dispatch(addToCart(service));
    },
    onTrashClick: (service) => {
      console.log(service);
      //const appendedObj = obj[service];
      //console.log(appendedObj);
      dispatch(removeFromCart(service));
    },
  };
}

const withOilChangeData = graphql(OIL_CHANGE_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    oilChange: laborEstimates,
  }),
});

const withWinterizationData = graphql(WINTERIZATION_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    winterization: laborEstimates,
  }),
});

export default compose(
  withOilChangeData,
  withWinterizationData,
  connect(mapStateToProps, mapDispatchToProps)
)(QuoteCentral);
