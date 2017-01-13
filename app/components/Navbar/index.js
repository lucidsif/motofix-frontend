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

import { createStructuredSelector } from 'reselect';
import { selectCart, selectPart } from 'containers/QuoteCentral/selectors';

export class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };

    this.handleItemClick = (e, { name }) => {
      browserHistory.push(name);
      this.setState({ activeItem: name });
    };
  }
  test(){
    console.log(this.props);
  }

  // calc total price in cart
  // replace menu with hamburger

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary>
        {this.test()}
        <Menu.Item><Image src={logo} size="tiny" /></Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Label color="teal">
              <Icon name='in cart' /> $140
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
