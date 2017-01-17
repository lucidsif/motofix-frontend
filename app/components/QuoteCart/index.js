/**
*
* QuoteCart
*
*/

import React from 'react';
import { Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';
import PriceBreakDown from 'components/PriceBreakDown';
export const services = ['Accessory Installation', 'Air Filter Replacement', 'Brake Pad Replacement', 'Brakes Are Squeaking', 'Chain And Sprocket Replacement', 'Check Engine Or FI Light Is On', 'Clean And Lube Chain', 'Fluids Are Leaking', 'Motorcycle Is Not Starting', 'Motorcycle Is Overheating', 'NY State Inspection', 'Prepurchase Inspection', 'Smoke Or Steam Is Coming Out Of Motorcycle', 'Spongy Braking', 'Suspension Tuning', 'Tire Replacement', 'Valve Adjustment', 'Warning Light Is On', 'Winterization','Oil Change'];

// TODO: 7/10 make navbar fixed at the top and put props.props.cart price in there
// TODO: 6.5/10 Find a more functional/cleaner approach to calculate estimate, if possible

function QuoteCart(props) {

  const totalPartsPrice = () => {
    let sum = 0;
    const sumOfParts = services.map((service) => {
      let regexedService = service.replace(/\s/g, "");
      return regexedService;
    })
      .reduce((acc, curr) => {
        if(props.props.cart[curr].selected && props.props.part[curr]){
          console.log(`${curr} is selected and a part exists for it`)
          for (var key in props.props.part[curr]){
            if(props.props.part[curr].hasOwnProperty(key)){
              let price = parseInt(props.props.part[curr][key].price.__value__);
              sum += price
            }
          }
        }
        else {
          return acc + 0;
        }
      }, 0);
    return sum;
    // return sumOfParts;
  }

  // TODO: 9/10 when you get autodata api, you must extract the right key-value  here
  const totalServicesPrice = () => {
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

    function totalPrice(){
    let subTotal = totalServicesPrice() + totalPartsPrice();

      let taxRate = .0875;
      let tax = subTotal*taxRate;

      let total = subTotal + tax;
      return parseFloat(Math.round(total*1)/1);
    }

    function totalDealerFloated(){
      let dealerServicePrice = (totalServicesPrice()/67)*95;
      let dealerPartsPrice = (totalPartsPrice() + totalPartsPrice()*.10);
      let dealerSubTotal = dealerPartsPrice + dealerServicePrice;
      let taxRate = .0875;
      let tax = dealerSubTotal*taxRate;

      let total = dealerSubTotal + tax;
      return parseFloat(Math.round(total*1)/1);
    }

    function totalSavings(){
      let taxRate = .0875;

      let dealerServicePrice = (totalServicesPrice()/67)*95;
      let dealerPartsPrice = (totalPartsPrice() + totalPartsPrice()*.10);
      let dealerSubTotal = dealerPartsPrice + dealerServicePrice;

      let dealerTax = dealerSubTotal*taxRate;
      let dealerTotal = dealerSubTotal + dealerTax;

      let motofixSubTotal = totalServicesPrice() + totalPartsPrice();
      let motoFixTax = motofixSubTotal*taxRate;

      let motofixTotal = motofixSubTotal + motoFixTax;
      let savings = dealerTotal - motofixTotal;

      return parseFloat(Math.round(savings * 1)/1);

    }
  return (
    <Grid.Row>
      <Segment padded="very">
        <Grid.Row>
          <p className="totalPriceNum">Your Total Estimate: </p>
        </Grid.Row>
        <Grid centered divided="vertically">
          <Grid.Row>
            <Label color="teal" size="big">${totalPrice()}</Label>
          </Grid.Row>

          <Grid.Row columns={2} divided>
            <Grid.Column>
              <p>Dealer Price:</p>
              <Label color="red" size="large">~${totalDealerFloated()}</Label>
            </Grid.Column>
            <Grid.Column>
              <p>Total Savings:</p>
              <Label color="teal" size="large">~${totalSavings()}</Label>
            </Grid.Column>
          </Grid.Row>

          <Accordion>
            <Accordion.Title>
              <Icon name="dropdown" />
                See cost breakdown
            </Accordion.Title>
            <Accordion.Content>
                <PriceBreakDown cart={props.props.cart} part={props.props.part} client={props.props.client} totalServicesPrice={totalServicesPrice} totalPartsPrice={totalPartsPrice} />
            </Accordion.Content>
          </Accordion>

        </Grid>
      </Segment>
    </Grid.Row>
  );
}

export default QuoteCart;
