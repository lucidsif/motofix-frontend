/**
*
* StripeCheckout
*
*/

import React from 'react';
import StripeCheckoutComp from 'react-stripe-checkout';

// TODO: following:
// create stripe charge(graphql mutation =>
// save quote (graphql mutation, get cart, vehicle, and part from props) =>
// save appointment(graphql mutation, get address from props) =>
// save mobile (graphql mutation, get mobile number from props)

class StripeCheckout extends React.Component {
  onToken = (token) => {
    const extractedToken = token;
    extractedToken.amount = 1800; // dynamic
    const stringifiedToken = JSON.stringify(extractedToken);
    console.log(stringifiedToken);
  }

  // ...

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

export default StripeCheckout;

