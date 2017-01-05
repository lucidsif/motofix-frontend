/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';

import { addToCart, removeFromCart } from './actions';

import { createStructuredSelector } from 'reselect';
import { selectCart } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';

// TODO: 8/10 Create the price breakdown component
// TODO: 6.5/10 add conditional rendering: if no vehicle => route back to select vehicle
export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.vehicle);
    console.log(this.props.cart);
    return (
      <div>
      {this.props.cart.Winterization ? (
        <p>Winterization is in cart</p>
      ) : (<p>Winterization is not in cart </p>
      )}
        <QuoteCart />
        <AddServices cart={this.props.cart} onCartClick={this.props.onCartClick} onTrashClick={this.props.onTrashClick} />
        <Grid.Row>
          <Button floated="right" color="teal">Next</Button>
          <Button floated="right">Back</Button>
        </Grid.Row>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
  cart: selectCart(),
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

export default connect(mapStateToProps, mapDispatchToProps)(QuoteCentral);
