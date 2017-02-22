/**
*
* PriceBreakDown
*
*/

import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Container, List, Image, Label, Checkbox } from 'semantic-ui-react';
import { services } from 'components/QuoteCart';
import gql from 'graphql-tag';

// TODO: 5/10 Fix css styling so item title is in the vertically aligned in the middle

class PriceBreakDown extends React.Component {
  constructor(props) {
    super(props);
  }

  floatServicePrice() {
    return parseFloat(Math.round(this.props.totalServicesPrice() * 100) / 100).toFixed(2);
  }
  floatPartsPrice() {
    return parseFloat(Math.round(this.props.totalPartsPrice() * 100) / 100).toFixed(2);
  }
  floatTax() {
    const total = this.props.totalServicesPrice() + this.props.totalPartsPrice();
    const taxRate = 0.0875;
    const tax = total * taxRate;
    return parseFloat(Math.round(tax * 100) / 100).toFixed(2);
  }
  floatTotalPrice() {
    const subTotal = this.props.totalServicesPrice() + this.props.totalPartsPrice();

    const taxRate = 0.0875;
    const tax = subTotal * taxRate;

    const total = subTotal + tax;
    return parseFloat(Math.round(total * 100) / 100).toFixed(2);
  }

  multiplyAndFloat(num) {
    const laborPrice = num * 67 * 2;
    return parseFloat(Math.round(laborPrice * 100) / 100).toFixed(2);
  }

  ifNegativeNum(num) {
    if (num < 0) {
      return 'n/a';
    }
    return num;
  }

  renderServices() {
    const filtered = services.filter((service) => this.props.cart[service.replace(/\s/g, '')].selected);
    return filtered.map((filteredService) => {
      let laborTime = this.multiplyAndFloat(this.props.cart[filteredService.replace(/\s/g, '')].laborTime);
      const unAvailableLaborTime = this.props.cart[filteredService.replace(/\s/g, '')].unavailable;
      if (unAvailableLaborTime) {
        laborTime = -9;
      }
      return (
        <List.Item key={filteredService}>
          <List.Content floated="left"><List.Icon name="linkify" /></List.Content>
          <List.Content floated="left" verticalAlign="middle">
            <span className="service-span">{filteredService}</span></List.Content>
          <List.Content floated="right" verticalAlign="middle">
            <span className="service-span">{this.ifNegativeNum(laborTime)}</span>
          </List.Content>
          <List.Content>
            <List>
              {this.renderParts(filteredService.replace(/\s/g, ''))}
            </List>
          </List.Content>
        </List.Item>
      );
    });
  }
  renderParts(serviceName) {
    return Object.keys(this.props.part[serviceName]).map((key) => {
      if (this.props.part[serviceName][key].valid) {
        return (
          <List.Item key={serviceName + key}>
            <List.Item>
              <Image verticalAlign="middle" floated="left" src={this.props.part[serviceName][key].imageURL} size="tiny" />
              <List.Content floated="left" verticalAlign="middle">
                <span className="part-span">
                  <Label>{this.props.part[serviceName][key].quantity}x</Label> {this.props.part[serviceName][key].partTitle.substring(0, 60)}</span>
              </List.Content>
              <List.Content floated="right" verticalAlign="middle">
                { /* eslint no-underscore-dangle: ["error", { "allow": ["price_", "__value__"] }] */ }
                <span className="part-span">{this.props.part[serviceName][key].price.__value__}</span>
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

  createQuoteMutation() {
    // noinspection JSUnresolvedFunction
    if (this.props.authenticated) {
      return this.props.client.mutate({
        mutation: gql`
       mutation createUserQuote($token: String!, $motorcycleJSON: JSON!, $cartJSON: JSON!, $partJSON: JSON!){
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
          motorcycleJSON: JSON.stringify(this.props.vehicle),
          cartJSON: JSON.stringify(this.props.cart),
          partJSON: JSON.stringify(this.props.part),
        },
      }).then((response) => console.log(response.data.createUserQuote));
    }
    return browserHistory.push('/login');
  }
  onSaveBtnClick() {
    // only allow if authenticated and localToken exists
    if (this.props.authenticated && localStorage.getItem('authToken')) {
      this.createQuoteMutation();
      return this.props.onSaveQuoteClick();
    }
    return browserHistory.push('/login');
  }

  render() {
    return (
      <Container>
        <List>
          {this.ifNegativeNum(this.renderServices())}
        </List>
        <Checkbox toggle label="Use your own parts?" />
        <List divided relaxed>
          <List.Item>
            <List.Content floated="left">
              <p>Labor Total</p>
            </List.Content>
            <List.Content floated="right">
              <p>{this.ifNegativeNum(this.floatServicePrice())}</p>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="left">
              <p>Parts Total</p>
            </List.Content>
            <List.Content floated="right">
              <p>{this.ifNegativeNum(this.floatPartsPrice())}</p>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="left">
              <p> Tax</p>
            </List.Content>
            <List.Content floated="right">
              <p>{this.ifNegativeNum(this.floatTax())}</p>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="left">
              <p>Total Price</p>
            </List.Content>
            <List.Content floated="right">
              <p>{this.ifNegativeNum(this.floatTotalPrice())}</p>
            </List.Content>
          </List.Item>
        </List>

        <div>
          {this.props.quoteSaved &&
          <Button disabled>Quote Saved</Button>
          }
          {!this.props.quoteSaved && // only only to save quote and dispatch action if authenticated
          <Button onClick={() => this.onSaveBtnClick()}>Save Quote</Button>
          }
          <Button color="teal" onClick={() => browserHistory.push('/quote/schedule')}>Schedule Appointment</Button>
        </div>
      </Container>
    );
  }
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
