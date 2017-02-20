/**
*
* StripeCheckout
*
*/

import React from 'react';
import StripeCheckoutComp from 'react-stripe-checkout';

class StripeCheckout extends React.Component {
  onToken = (token) => {
    console.log(token);
    //console.log(fetch())
/*
    // graphql mutation postToken
    fetch('https://localhost:3010/graphql', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
    */
  }

  // ...

  render() {
    return (
      // ...
      <StripeCheckoutComp
        token={this.onToken}
        stripeKey="pk_test_Uq1Klar8ByVNEJGycRrPLA3X"
      >
        <button className="ui teal button">Pay with card</button>
      </StripeCheckoutComp>
    )
  }
}

export default StripeCheckout;
