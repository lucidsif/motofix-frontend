/**
*
* QuoteCart
*
*/

import React from 'react';
import { Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';
const services = ['Accessory Installation', 'Air Filter Replacement', 'Brake Pad Replacement', 'Brakes Are Squeaking', 'Chain And Sprocket Replacement', 'Check Engine Or FI Light Is On', 'Clean And Lube Chain', 'Fluids Are Leaking', 'Motorcycle Is Not Starting', 'Motorcycle Is Overheating', 'NY State Inspection', 'Prepurchase Inspection', 'Smoke Or Steam Is Coming Out Of Motorcycle', 'Spongy Braking', 'Suspension Tuning', 'Tire Replacement', 'Valve Adjustment', 'Warning Light Is On', 'Winterization','Oil Change'];

// TODO: 7/10 make navbar fixed at the top and put props.props.cart price in there
// TODO: 6.5/10 Find a more functional/cleaner approach to calculate estimate, if possible

function QuoteCart(props) {

  // TODO: 9/10 when you get autodata api, you must extract the right key-value  here
  const totalServicePrice = () => {
    const sumOfLaborTimes = services.map((service) => {
      let regexedService = service.replace(/\s/g, "");
      return regexedService;
    })
      .reduce((acc, curr) => {
      if(props.props.cart[curr].selected && typeof props.props.cart[curr].laborTime ==="number" ){
        const laborTime = props.props.cart[curr].laborTime;
        console.log(`service: ${curr} with labortime: ${laborTime} is selected`);
        return acc + laborTime;
      }
      else {
        return acc + 0;
      }
    }, 0);
    return sumOfLaborTimes * 67;
    }
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
