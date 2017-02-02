/**
*
* SavedQuoteBreakDown
*
*/

import React from 'react';
import { Container, List, Image, Label } from 'semantic-ui-react';
import { services } from 'components/QuoteCart';

// TODO: Order from most recent
function SavedQuoteBreakDown(props) {
  const totalPartsPrice = () => {
    let sum = 0;
    services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
      .reduce((acc, curr) => {
        if (props.cart[curr].selected && props.part[curr]) {
          // serviceparts shouls be an array of parts belonging to a service
          const servicePartKeys = Object.keys(props.part[curr]);
          return servicePartKeys.reduce((accu, currKey) => {
            if (props.part[curr][currKey].valid) {
              /* eslint no-underscore-dangle: ["error", { "allow": ["price_", "__value__"] }] */
              const price = parseFloat(props.part[curr][currKey].price.__value__);
              const quantity = parseFloat(props.part[curr][currKey].quantity);
              sum += price * quantity;
              return sum;
            }
            return sum;
          }, 0);
        }
        return acc + 0;
      }, 0);
    return sum;
  };

  // TODO: 9/10 when you get autodata api, you must extract the right key-value  here
  const totalServicesPrice = () => {
    // return N/A if any selected service has an unavailable labortime
    const selectedUnavailableServices = Object.keys(props.cart).filter((key) => props.cart[key].selected && props.cart[key].unavailable);

    if (selectedUnavailableServices && selectedUnavailableServices.length > 0) {
      return 'N/A';
    }

    const sumOfLaborTimes = services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
      .reduce((acc, curr) => {
        if (props.cart[curr].selected && typeof props.cart[curr].laborTime === 'number') {
          const laborTime = props.cart[curr].laborTime;
          return acc + laborTime;
        }
        return acc + 0;
      }, 0);

    return sumOfLaborTimes * 67;
  };
  /*
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
*/
  function floatServicePrice() {
    return parseFloat(Math.round(totalServicesPrice() * 100) / 100).toFixed(2);
  }
  function floatPartsPrice() {
    return parseFloat(Math.round(totalPartsPrice() * 100) / 100).toFixed(2);
  }
  function floatTax() {
    const total = totalServicesPrice() + totalPartsPrice();
    const taxRate = 0.0875;
    const tax = total * taxRate;
    return parseFloat(Math.round(tax * 100) / 100).toFixed(2);
  }
  function floatTotalPrice() {
    const subTotal = totalServicesPrice() + totalPartsPrice();

    const taxRate = 0.0875;
    const tax = subTotal * taxRate;

    const total = subTotal + tax;
    return parseFloat(Math.round(total * 100) / 100).toFixed(2);
  }

  function multiplyAndFloat(num) {
    const laborPrice = num * 67;
    return parseFloat(Math.round(laborPrice * 100) / 100).toFixed(2);
  }

  function renderServices() {
    const filtered = services.filter((service) => props.cart[service.replace(/\s/g, '')].selected);
    return filtered.map((filteredService) => {
      let laborTime = multiplyAndFloat(props.cart[filteredService.replace(/\s/g, '')].laborTime);
      const unAvailableLaborTime = props.cart[filteredService.replace(/\s/g, '')].unavailable;
      if (unAvailableLaborTime) {
        laborTime = 'N/A';
      }
      return (
        <List.Item key={filteredService}>
          <List.Content floated="left"><List.Icon name="linkify" /></List.Content>
          <List.Content floated="left" verticalAlign="middle">
            <span className="service-span">{filteredService}</span></List.Content>
          <List.Content floated="right" verticalAlign="middle">
            <span className="service-span">{laborTime}</span>
          </List.Content>
          <List.Content>
            <List>
              {renderParts(filteredService.replace(/\s/g, ''))}
            </List>
          </List.Content>
        </List.Item>
      );
    });
  }
  function renderParts(serviceName) {
    return Object.keys(props.part[serviceName]).map((key) => {
      if (props.part[serviceName][key].valid) {
        return (
          <List.Item key={serviceName + key}>
            <List.Item>
              <Image verticalAlign="middle" floated="left" src={props.part[serviceName][key].imageURL} size="tiny" />
              <List.Content floated="left" verticalAlign="middle">
                <span className="part-span">
                  <Label>{props.part[serviceName][key].quantity}x</Label> {props.part[serviceName][key].partTitle.substring(0, 60)}</span>
              </List.Content>
              <List.Content floated="right" verticalAlign="middle">
                { /* eslint no-underscore-dangle: ["error", { "allow": ["price_", "__value__"] }] */ }
                <span className="part-span">{props.part[serviceName][key].price.__value__}</span>
              </List.Content>
            </List.Item>
          </List.Item>
        );
      }
      return (
        <List.Item key={serviceName + key}>
          <List.Item>
            <Image verticalAlign="middle" floated="left" src={'http://authoritywebsiteincome.com/wp-content/uploads/2013/11/mystery-landing-page.png'} size="tiny" />
            <List.Content floated="left" verticalAlign="middle">
              <span className="part-span">{key} could not be found for this model at this time</span>
            </List.Content>
            <List.Content floated="right" verticalAlign="middle">
              <span className="part-span">N/A</span>
            </List.Content>
          </List.Item>
        </List.Item>
      );
    });
  }
  return (
    <Container>
      <List>
        {renderServices()}
      </List>
      <p><a>Have your own parts?</a></p>
      <List divided relaxed>
        <List.Item>
          <List.Content floated="left">
            <p>Labor Total</p>
          </List.Content>
          <List.Content floated="right">
            <p>{floatServicePrice()}</p>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="left">
            <p>Parts Total</p>
          </List.Content>
          <List.Content floated="right">
            <p>{floatPartsPrice()}</p>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="left">
            <p> Tax</p>
          </List.Content>
          <List.Content floated="right">
            <p>{floatTax()}</p>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="left">
            <p>Total Price</p>
          </List.Content>
          <List.Content floated="right">
            <p>{floatTotalPrice()}</p>
          </List.Content>
        </List.Item>
      </List>
    </Container>
  );
}

SavedQuoteBreakDown.propTypes = {
  cart: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  part: React.PropTypes.object,
};

export default SavedQuoteBreakDown;
