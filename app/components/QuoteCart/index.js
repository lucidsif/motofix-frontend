/**
*
* QuoteCart
*
*/

import React from 'react';
import { Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';

function QuoteCart() {
  return (
    <Grid.Row>
      <Segment padded="very">
        <Grid.Row>
          <p className="totalPriceNum">Your Total Price: </p>
        </Grid.Row>
        <Grid centered divided="vertically">
          <Grid.Row>
            <Label color="teal" size="big">$70.00</Label>
          </Grid.Row>

          <Grid.Row columns={2} divided>
            <Grid.Column>
              <p>Dealer Price:</p>
              <Label color="red" size="large">~$110</Label>
            </Grid.Column>
            <Grid.Column>
              <p>Total Savings:</p>
              <Label color="teal" size="large">~$40 (36%)</Label>
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
