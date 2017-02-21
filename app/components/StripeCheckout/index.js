/**
*
* StripeCheckout
*
*/

import React from 'react';
import StripeCheckoutComp from 'react-stripe-checkout';

// TODO: replace fetch with graphql query
class StripeCheckout extends React.Component {
  onToken = (token) => {
    console.log(token);
    fetch('http://localhost:3010/stripes', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        alert(`We are in business, ${data.email}`);
      });
    });
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
        amount={1950}
        currency="USD"
        email="test44@email.com"
        allowRememberMe
      >
        <button className="ui teal button">Pay with card</button>
      </StripeCheckoutComp>
    );
  }
}

export default StripeCheckout;
