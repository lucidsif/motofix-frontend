/**
*
* Navbar
*
*/

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Dropdown, Menu } from 'semantic-ui-react';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' };

    this.handleItemClick = (e, { name }) => {
      browserHistory.push(name);
      this.setState({ activeItem: name });
    };
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary>
        <Menu.Item name="Landing" active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name="features" active={activeItem === 'features'} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.handleItemClick} />
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
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

export default AppNavbar;
