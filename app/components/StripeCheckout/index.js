/**
*
* StripeCheckout
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { withApollo, graphql, compose } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import { selectCart, selectPart, selectUseOwnParts } from 'containers/QuoteCentral/selectors';
import StripeCheckoutComp from 'react-stripe-checkout';
import { services } from 'components/QuoteCart';

class StripeCheckout extends React.Component {
  totalPartsPrice() { // eslint-disable-line react/sort-comp
    let sum = 0;
    services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
    .reduce((acc, curr) => {
      if (this.props.cart[curr].selected && this.props.part[curr]) {
        // serviceparts shouls be an array of parts belonging to a service
        const servicePartKeys = Object.keys(this.props.part[curr]);
        return servicePartKeys.reduce((accu, currKey) => {
          if (this.props.part[curr][currKey].valid) {
            /* if engine oil part, cut price in half*/
            /* eslint no-underscore-dangle: ["error", { "allow": ["price_", "__value__"] }] */
            const price = this.props.part[curr][currKey] === this.props.part[curr].EngineOil ? parseFloat(this.props.part[curr][currKey].price.__value__ / 2) : parseFloat(this.props.part[curr][currKey].price.__value__);
            const quantity = parseFloat(this.props.part[curr][currKey].quantity);
            sum += price * quantity;
            return sum;
          }
          return sum;
        }, 0);
      }
      return acc + 0;
    }, 0);
  // if using own parts, return 0 for parts cost
    if (!this.props.useOwnParts) {
      return sum;
    }
    return 0;
  }

  // TODO: 9/10 when you get autodata api, you must extract the right key-value  here
  totalServicesPrice() {
  // return N/A if any selected service has an unavailable labortime
    const selectedUnavailableServices = Object.keys(this.props.cart).filter((key) => this.props.cart[key].selected && this.props.cart[key].unavailable);

    if (selectedUnavailableServices && selectedUnavailableServices.length > 0) {
      return -9;
    }

    const sumOfLaborTimes = services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
    .reduce((acc, curr) => {
      if (this.props.cart[curr].selected && typeof this.props.cart[curr].laborTime === 'number') {
        const laborTime = this.props.cart[curr].laborTime;
        return acc + laborTime;
      }
      return acc + 0;
    }, 0);

    return sumOfLaborTimes * 67 * 2;
  }
  totalPrice() {
    const subTotal = this.totalServicesPrice() + this.totalPartsPrice();
    const taxRate = 0.0875;
    const tax = subTotal * taxRate;
    const total = subTotal + tax;
    return parseFloat(Math.round(total * 1) / 1);
  }

  // TODO: following:
// get total from quotecart
// create stripe charge(graphql mutation =>
// save quote (graphql mutation, get cart, vehicle, and part from props) =>
// save appointment(graphql mutation, get address from props) =>
// save mobile (graphql mutation, get mobile number from props)
  onToken = (token) => {
    const extractedToken = token;
    extractedToken.amount = this.totalPrice() * 100; // dynamic
    const stringifiedToken = JSON.stringify(extractedToken);
    console.log(stringifiedToken);
  }

  render() {
    return (
      // ...
      <StripeCheckoutComp
        name="motofix"
        description="Your personal mechanic anywhere"
        image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
        token={this.onToken}
        stripeKey="pk_test_Uq1Klar8ByVNEJGycRrPLA3X"
        panelLabel="Pay"
        currency="USD"
        email="test44@email.com" // make dynamic
        allowRememberMe
        zipcode
      >
        <button className="ui teal button">Pay with card</button>
      </StripeCheckoutComp>
    );
  }
}

StripeCheckout.propTypes = {
  cart: React.PropTypes.object,
  part: React.PropTypes.object,
  useOwnParts: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // authenticated: selectAuthenticated(),
  cart: selectCart(),
  part: selectPart(),
  useOwnParts: selectUseOwnParts(),
});

const StripeCheckoutRedux = connect(mapStateToProps, null);


export default compose(
  StripeCheckoutRedux,
  withApollo,
)(StripeCheckout);

