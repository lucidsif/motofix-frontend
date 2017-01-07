/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';

import { addToCart, removeFromCart } from './actions';

import { createStructuredSelector } from 'reselect';
import { selectCart, selectEstimate } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';

// TODO: 8/10 Create the price breakdown component
// TODO: 6.5/10 add conditional rendering: if no vehicle => route back to select vehicle
// TODO: 6/10 make sure the onclick handler for the back button isn't being recreated on every rerender
// TODO: 5.5/10 route back buttom backwards instead of to a specific point
export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.vehicle);
    console.log(this.props.cart);
    console.log(this.props.estimate);
    console.log(this.props.oilChange);
    return (
      <div>
        <QuoteCart estimate={this.props.estimate} />
        <AddServices cart={this.props.cart} onCartClick={this.props.onCartClick} onTrashClick={this.props.onTrashClick} />
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

const withData = graphql(OIL_CHANGE_QUERY, {
  props: ({ ownProps, data: { loading, laborEstimates } }) => ({
    loading,
    oilChange: laborEstimates.response,
  }),
});

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
  cart: selectCart(),
  estimate: selectEstimate(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCartClick: (service) => {
      console.log(`${service} is added to cart`);
      dispatch(addToCart(service));
    },
    onTrashClick: (service) => {
      console.log(`${service} is removed from cart`);
      dispatch(removeFromCart(service));
    },
  };
}

QuoteCentral = withData(QuoteCentral);
export default connect(mapStateToProps, mapDispatchToProps)(QuoteCentral);
