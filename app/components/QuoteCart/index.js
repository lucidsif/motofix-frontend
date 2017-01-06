/**
*
* QuoteCart
*
*/

import React from 'react';
import { Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';

function QuoteCart({ estimate }) {
  if (estimate){console.log('estimate prop was passed to cart')};
  if (estimate){console.log(estimate.total)};
  return (
    <Grid.Row>
      <Segment padded="very">
        <Grid.Row>
          <p className="totalPriceNum">Your Total Estimate: </p>
        </Grid.Row>
        <Grid centered divided="vertically">
          <Grid.Row>
            <Label color="teal" size="big">${estimate.total}</Label>
          </Grid.Row>

          <Grid.Row columns={2} divided>
            <Grid.Column>
              <p>Dealer Price:</p>
              <Label color="red" size="large">~${estimate.dealer}</Label>
            </Grid.Column>
            <Grid.Column>
              <p>Total Savings:</p>
              <Label color="teal" size="large">~${estimate.priceSavings} (%{estimate.percentSavings})</Label>
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
