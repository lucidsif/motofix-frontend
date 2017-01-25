/**
*
* Navbar
*
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Dropdown, Menu, Image, Icon, Label } from 'semantic-ui-react';
import logo from './home-logo.png';
import { services } from 'components/QuoteCart';

import { createStructuredSelector } from 'reselect';
import { selectCart, selectPart } from 'containers/QuoteCentral/selectors';

// TODO: 7/10 when cart is clicked, it should route to quotecart
// TODO: handle edge cases like if props is null
// TODO: 5/10 export all calculating functions into a utility functions file
export class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };

    this.handleItemClick = (e, { name }) => {
      browserHistory.push(name);
      this.setState({ activeItem: name });
    };
  }
  totalPartsPrice() {
  let sum = 0;
  const sumOfParts = services.map((service) => {
    let regexedService = service.replace(/\s/g, "");
    return regexedService;
  })
    .reduce((acc, curr) => {
      if(this.props.cart[curr].selected && this.props.part[curr]){
        console.log(`${curr} is selected and a part exists for it`)
        for (var key in this.props.part[curr]){
          if(this.props.part[curr].hasOwnProperty(key) && this.props.part[curr][key].valid){
            let price = parseInt(this.props.part[curr][key].price.__value__);
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
  totalServicesPrice(){

    let selectedUnavailableServices = Object.keys(this.props.cart).filter((key) => {
      return this.props.cart[key].selected && this.props.cart[key].unavailable
    })
    if(selectedUnavailableServices && selectedUnavailableServices.length > 0){
      console.log(selectedUnavailableServices)
      return 'N/A'
    }
    
  const sumOfLaborTimes = services.map((service) => {
    let regexedService = service.replace(/\s/g, "");
    return regexedService;
  })
    .reduce((acc, curr) => {
      if(this.props.cart[curr].selected && typeof this.props.cart[curr].laborTime ==="number" ){
        const laborTime = this.props.cart[curr].laborTime;
        console.log(`service: ${curr} with labortime: ${laborTime} is selected`);
        return acc + laborTime;
      }
      else {
        return acc + 0;
      }
    }, 0);
  return sumOfLaborTimes * 67;
}

  totalPrice() {
  let subTotal = this.totalServicesPrice() + this.totalPartsPrice();

  let taxRate = .0875;
  let tax = subTotal*taxRate;

  let total = subTotal + tax;
  return parseFloat(Math.round(total*1)/1);
}

  // calc total price in cart
  // replace menu with hamburger

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary fixed='top' className='padRight'>
        <Menu.Item>
          <Image src={logo} size="tiny" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Label color="teal">
              <Icon name='in cart' /> ${this.totalPrice()}
            </Label>
          </Menu.Item>
        </Menu.Menu>
        <Dropdown text="Menu" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Header>Main</Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>New Quote</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Settings</Dropdown.Header>
            <Dropdown.Item>Payments</Dropdown.Item>
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Item>Log in</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cart: selectCart(),
  part: selectPart(),
});

AppNavBar = connect(mapStateToProps, null)(AppNavBar);

export default AppNavBar;
