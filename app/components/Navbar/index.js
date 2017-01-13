/**
*
* Navbar
*
*/

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Dropdown, Menu, Image, Icon, Label } from 'semantic-ui-react';
import logo from './home-logo.png';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };

    this.handleItemClick = (e, { name }) => {
      browserHistory.push(name);
      this.setState({ activeItem: name });
    };
  }

  // add cart icon
  // calc total price in cart
  // replace menu with hamburger

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary>
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

export default AppNavbar;
