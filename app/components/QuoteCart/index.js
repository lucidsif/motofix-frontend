/**
*
* QuoteCart
*
*/

import React from 'react';
import { Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';
const services = ['Accessory Installation', 'Air Filter Replacement', 'Brake Pad Replacement', 'Brakes Are Squeaking', 'Chain And Sprocket Replacement', 'Check Engine Or FI Light Is On', 'Clean And Lube Chain', 'Fluids Are Leaking', 'Motorcycle Is Not Starting', 'Motorcycle Is Overheating', 'NY State Inspection', 'Prepurchase Inspection', 'Spongy Braking', 'Suspension Tuning', 'Tire Replacement', 'Valve Adjustment', 'Warning Light Is On', 'Winterization'];


// TODO: 7/10 make navbar fixed at the top and put props.props.cart price in there
// TODO: 6.5/10 Find a more functional/cleaner approach to calculate estimate, if possible
// service total will be the sum of every service in props.props.cart prop that is selected true
function QuoteCart(props) {

  const totalServicePrice = () => {
    let sum = services.map((service) => {
      let regexedService = service.replace(/\s/g, "");
      return regexedService;
    })
      .reduce((acc, curr) => {
      console.log(curr);
      let objService = props.props[curr];
      if(objService && props.props.cart[curr]){
        console.log(objService);
        let parsedResponse = JSON.parse(objService.response);
        return acc + parsedResponse.time;
      }
      else {
        console.log('service not found or not selected');
        return acc + 0;
      }
    }, 0);
    return sum * 67;
    }
  /*
  // try to calculate laborTime from the apolloprop
  // once you can do that, the cart price should be calculated from these props instead
  // decouple labortime from eventhandler
  const testApolloPropRender = () => {

  }
*/
  // console.log(props.props.OilChange);
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
