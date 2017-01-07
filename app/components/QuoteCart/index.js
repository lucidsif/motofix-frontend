/**
*
* QuoteCart
*
*/

import React from 'react';
import { Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';
// service total will be the sum of every service in cart prop that is selected true
function QuoteCart({ estimate, cart, oilChange, winterization }) {

  const totalServicePrice = () => {
    let sum = 0;
    for (var key in cart) {
      // skip loop if the property is from prototype

      if (!cart.hasOwnProperty(key)) continue;
      var obj = cart[key];
      for (var prop in obj) {
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) continue;

        // your code
        if(typeof obj[prop] === "number"){
          sum += obj[prop]
        }

      }
    }
    return sum * 67;
  }

  console.log(cart);
  //if (estimate){ console.log('estimate prop was passed to cart'); }
  return (
    <Grid.Row>
      <Segment padded="very">
        <Grid.Row>
          <p className="totalPriceNum">Your Total Estimate: </p>
        </Grid.Row>
        <Grid centered divided="vertically">
          <Grid.Row>
            <Label color="teal" size="big">${totalServicePrice()}</Label>
          </Grid.Row>

          <Grid.Row columns={2} divided>
            <Grid.Column>
              <p>Dealer Price:</p>
              <Label color="red" size="large">~${(totalServicePrice()/67)*95}</Label>
            </Grid.Column>
            <Grid.Column>
              <p>Total Savings:</p>
              <Label color="teal" size="large">~${((totalServicePrice()/67)*95 - totalServicePrice())}</Label>
            </Grid.Column>
          </Grid.Row>

          <Accordion>
            <Accordion.Title>
              <Icon name="dropdown" />
                See cost breakdown
            </Accordion.Title>
            <Accordion.Content>
              <p>
                Price breakdown component goes here
              </p>
            </Accordion.Content>
          </Accordion>

        </Grid>
      </Segment>
    </Grid.Row>
  );
}

export default QuoteCart;
