/**
*
* QuoteCart
*
*/

import React from 'react';
import { Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';

// TODO: 7/10 make navbar fixed at the top and put props.props.cart price in there
// TODO: 6.5/10 Find a more functional/cleaner approach to calculate estimate, if possible
// service total will be the sum of every service in props.props.cart prop that is selected true
function QuoteCart(props) {

  const totalServicePrice = () => {
    let sum = 0;
    for (const key in props.props.cart) {
      // skip loop if the property is from prototype

      if (!props.props.cart.hasOwnProperty(key)) continue;
      const obj = props.props.cart[key];
      for (const prop in obj) {
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(prop)) continue;

        // your code
        if (typeof obj[prop] === 'number') {
          sum += obj[prop];
        }
      }
    }
    return sum * 67;
  };
  /*
  // try to calculate laborTime from the apolloprop
  // once you can do that, the cart price should be calculated from these props instead
  // decouple labortime from eventhandler
  const testApolloPropRender = () => {

  }
*/
  console.log(props.props.OilChange);
  return (
    <Grid.Row>
      <Segment padded="very">
        <Grid.Row>
          {props.props.OilChange.laborEstimates &&
            props.props.OilChange.laborEstimates.response
          }
          <p className="totalPriceNum">Your Total Estimate: </p>
        </Grid.Row>
        <Grid centered divided="vertically">
          <Grid.Row>
            <Label color="teal" size="big">${totalServicePrice()}</Label>
          </Grid.Row>

          <Grid.Row columns={2} divided>
            <Grid.Column>
              <p>Dealer Price:</p>
              <Label color="red" size="large">~${(totalServicePrice() / 67) * 95}</Label>
            </Grid.Column>
            <Grid.Column>
              <p>Total Savings:</p>
              <Label color="teal" size="large">~${((totalServicePrice() / 67) * 95 - totalServicePrice())}</Label>
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
