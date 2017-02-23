/**
*
* QuoteCart
*
*/

import React from 'react';
import { Grid, Segment, Accordion, Icon, Label } from 'semantic-ui-react';
import PriceBreakDown from 'components/PriceBreakDown';
export const services = ['Accessory Installation', 'Air Filter Replacement', 'Brake Pad Replacement', 'Brakes Are Squeaking', 'Chain And Sprocket Replacement', 'Check Engine Or FI Light Is On', 'Clean And Lube Chain', 'Fluids Are Leaking', 'Motorcycle Is Not Starting', 'Motorcycle Is Overheating', 'NY State Inspection', 'Prepurchase Inspection', 'Smoke Or Steam Is Coming Out Of Motorcycle', 'Spongy Braking', 'Suspension Tuning', 'Tire Replacement', 'Valve Adjustment', 'Warning Light Is On', 'Winterization', 'Oil Change'];

// TODO: 9/10 fix label positioning

function QuoteCart(props) {
  const totalPartsPrice = () => {
    let sum = 0;
    services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
      .reduce((acc, curr) => {
        if (props.props.cart[curr].selected && props.props.part[curr]) {
          // serviceparts shouls be an array of parts belonging to a service
          const servicePartKeys = Object.keys(props.props.part[curr]);
          return servicePartKeys.reduce((accu, currKey) => {
            if (props.props.part[curr][currKey].valid) {
              /* if engine oil part, cut price in half*/
              /* eslint no-underscore-dangle: ["error", { "allow": ["price_", "__value__"] }] */
              const price = props.props.part[curr][currKey] === props.props.part[curr].EngineOil ? parseFloat(props.props.part[curr][currKey].price.__value__ / 2) : parseFloat(props.props.part[curr][currKey].price.__value__);
              const quantity = parseFloat(props.props.part[curr][currKey].quantity);
              sum += price * quantity;
              return sum;
            }
            return sum;
          }, 0);
        }
        return acc + 0;
      }, 0);
    // if using own parts, return 0 for parts cost
    if (!props.props.useOwnParts) {
      return sum;
    }
    return 0;
  };

  // TODO: 9/10 when you get autodata api, you must extract the right key-value  here
  const totalServicesPrice = () => {
    // return N/A if any selected service has an unavailable labortime
    const selectedUnavailableServices = Object.keys(props.props.cart).filter((key) => props.props.cart[key].selected && props.props.cart[key].unavailable);

    if (selectedUnavailableServices && selectedUnavailableServices.length > 0) {
      return -9;
    }

    const sumOfLaborTimes = services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
      .reduce((acc, curr) => {
        if (props.props.cart[curr].selected && typeof props.props.cart[curr].laborTime === 'number') {
          const laborTime = props.props.cart[curr].laborTime;
          return acc + laborTime;
        }
        return acc + 0;
      }, 0);

    return sumOfLaborTimes * 67 * 2;
  };
  function totalPrice() {
    const subTotal = totalServicesPrice() + totalPartsPrice();
    const taxRate = 0.0875;
    const tax = subTotal * taxRate;
    const total = subTotal + tax;
    return parseFloat(Math.round(total * 1) / 1);
  }
  function totalDealerFloated() {
    const dealerServicePrice = (totalServicesPrice() / 67) * 95;
    const dealerPartsPrice = (totalPartsPrice() + (totalPartsPrice() * 0.10));
    const dealerSubTotal = dealerPartsPrice + dealerServicePrice;
    const taxRate = 0.0875;
    const tax = dealerSubTotal * taxRate;
    const total = dealerSubTotal + tax;
    return parseFloat(Math.round(total * 1) / 1);
  }
  function totalSavings() {
    const taxRate = 0.0875;
    const dealerServicePrice = (totalServicesPrice() / 67) * 95;
    const dealerPartsPrice = (totalPartsPrice() + (totalPartsPrice() * 0.10));
    const dealerSubTotal = dealerPartsPrice + dealerServicePrice;
    const dealerTax = dealerSubTotal * taxRate;
    const dealerTotal = dealerSubTotal + dealerTax;
    const motofixSubTotal = totalServicesPrice() + totalPartsPrice();
    const motoFixTax = motofixSubTotal * taxRate;
    const motofixTotal = motofixSubTotal + motoFixTax;
    const savings = dealerTotal - motofixTotal;
    return parseFloat(Math.round(savings * 1) / 1);
  }

  function ifNegativeNum(num) {
    if (num < 0) {
      return 'n/a';
    }
    return num;
  }
  return (
    <Grid.Row>
      <Segment padded="very">
        <Grid.Row>
          <p className="totalPriceNum">Your Total Estimate: </p>
        </Grid.Row>
        <Grid centered divided="vertically">
          <Grid.Row>
            <Label color="teal" size="big">${ifNegativeNum(totalPrice())}</Label>
          </Grid.Row>

          <Grid.Row columns={2} centered divided className="forceCenterAlign">
            <Grid.Column>
              <p>Dealer Price:</p>
              <Label color="red" size="large">~${ifNegativeNum(totalDealerFloated())}</Label>
            </Grid.Column>
            <Grid.Column>
              <p>Total Savings:</p>
              <Label color="teal" size="large">~${ifNegativeNum(totalSavings())}</Label>
            </Grid.Column>
          </Grid.Row>

          <Accordion>
            <Accordion.Title>
              <Icon name="dropdown" />
              See cost breakdown
            </Accordion.Title>
            <Accordion.Content>
              <PriceBreakDown
                authenticated={props.props.authenticated}
                quoteSaved={props.props.quoteSaved}
                useOwnParts={props.props.useOwnParts}
                vehicle={props.props.vehicle}
                cart={props.props.cart}
                part={props.props.part}
                client={props.props.client}
                onSaveQuoteClick={props.props.onSaveQuoteClick}
                onUseOwnParts={props.props.onUseOwnParts}
                onDeUseOwnParts={props.props.onDeUseOwnParts}
                totalServicesPrice={totalServicesPrice}
                totalPartsPrice={totalPartsPrice}
              />
            </Accordion.Content>
          </Accordion>
        </Grid>
      </Segment>
    </Grid.Row>
  );
}

QuoteCart.propTypes = {
  props: React.PropTypes.object,
  authenticated: React.PropTypes.bool,
  quoteSaved: React.PropTypes.bool,
  onSaveQuoteClick: React.PropTypes.func,
  client: React.PropTypes.object,
  vehicle: React.PropTypes.object,
  cart: React.PropTypes.object,
  part: React.PropTypes.object,
};

export default QuoteCart;
