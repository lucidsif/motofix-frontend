/**
*
* PriceBreakDown
*
*/

import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Container, List, Image, Label } from 'semantic-ui-react';
import { services } from 'components/QuoteCart';
import gql from 'graphql-tag';

// TODO: 5/10 Fix css styling so item title is in the vertically aligned in the middle

function PriceBreakDown(props) {
  function floatServicePrice() {
    return parseFloat(Math.round(props.totalServicesPrice() * 100) / 100).toFixed(2);
  }
  function floatPartsPrice() {
    return parseFloat(Math.round(props.totalPartsPrice() * 100) / 100).toFixed(2);
  }
  function floatTax() {
    const total = props.totalServicesPrice() + props.totalPartsPrice();
    const taxRate = 0.0875;
    const tax = total * taxRate;
    return parseFloat(Math.round(tax * 100) / 100).toFixed(2);
  }
  function floatTotalPrice() {
    const subTotal = props.totalServicesPrice() + props.totalPartsPrice();

    const taxRate = 0.0875;
    const tax = subTotal * taxRate;

    const total = subTotal + tax;
    return parseFloat(Math.round(total * 100) / 100).toFixed(2);
  }

  function multiplyAndFloat(num) {
    const laborPrice = num * 67 * 2;
    return parseFloat(Math.round(laborPrice * 100) / 100).toFixed(2);
  }

  function ifNegativeNum(num) {
    if (num < 0) {
      return 'n/a';
    }
    return num;
  }

  function renderServices() {
    const filtered = services.filter((service) => props.cart[service.replace(/\s/g, '')].selected);
    return filtered.map((filteredService) => {
      let laborTime = multiplyAndFloat(props.cart[filteredService.replace(/\s/g, '')].laborTime);
      const unAvailableLaborTime = props.cart[filteredService.replace(/\s/g, '')].unavailable;
      if (unAvailableLaborTime) {
        laborTime = -9;
      }
      return (
        <List.Item key={filteredService}>
          <List.Content floated="left"><List.Icon name="linkify" /></List.Content>
          <List.Content floated="left" verticalAlign="middle">
            <span className="service-span">{filteredService}</span></List.Content>
          <List.Content floated="right" verticalAlign="middle">
            <span className="service-span">{ifNegativeNum(laborTime)}</span>
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

  function createQuoteMutation() {
    // noinspection JSUnresolvedFunction
    if (props.authenticated) {
      return props.client.mutate({
        mutation: gql`
       mutation createUserQuote($token: String, $motorcycleJSON: JSON, $cartJSON: JSON, $partJSON: JSON){
        createUserQuote(token: $token, motorcycleJSON: $motorcycleJSON, cartJSON: $cartJSON, partJSON: $partJSON){
          id
          fk_users_id
          motorcycle_json
          cart_json
          part_json
          created_at
          updated_at
         }
       }
      `,
        variables: {
          token: localStorage.getItem('authToken'),
          motorcycleJSON: JSON.stringify(props.vehicle),
          cartJSON: JSON.stringify(props.cart),
          partJSON: JSON.stringify(props.part),
        },
      }).then((response) => console.log(response.data.createUserQuote));
    }
    return browserHistory.push('/login');
  }
  function onSaveBtnClick() {
    // only allow if authenticated and localToken exists
    if (props.authenticated && localStorage.getItem('authToken')) {
      createQuoteMutation();
      return props.onSaveQuoteClick();
    }
    return browserHistory.push('/login');
  }

  return (
    <Container>
      <List>
        {ifNegativeNum(renderServices())}
      </List>
      <p><a>Have your own parts? (currently disabled)</a></p>
      <List divided relaxed>
        <List.Item>
          <List.Content floated="left">
            <p>Labor Total</p>
          </List.Content>
          <List.Content floated="right">
            <p>{ifNegativeNum(floatServicePrice())}</p>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="left">
            <p>Parts Total</p>
          </List.Content>
          <List.Content floated="right">
            <p>{ifNegativeNum(floatPartsPrice())}</p>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="left">
            <p> Tax</p>
          </List.Content>
          <List.Content floated="right">
            <p>{ifNegativeNum(floatTax())}</p>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="left">
            <p>Total Price</p>
          </List.Content>
          <List.Content floated="right">
            <p>{ifNegativeNum(floatTotalPrice())}</p>
          </List.Content>
        </List.Item>
      </List>

      <div>
        {props.quoteSaved &&
        <Button disabled>Quote Saved</Button>
        }
        {!props.quoteSaved && // only only to save quote and dispatch action if authenticated
        <Button onClick={() => onSaveBtnClick()}>Save Quote</Button>
        }
        <Button color="teal" onClick={() => browserHistory.push('/quote/schedule')}>Schedule Appointment</Button>
      </div>
    </Container>
  );
}

PriceBreakDown.propTypes = {
  client: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  authenticated: React.PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  quoteSaved: React.PropTypes.bool,
  onSaveQuoteClick: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  vehicle: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  cart: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  part: React.PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

export default PriceBreakDown;
