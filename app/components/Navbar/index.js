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
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name="features" active={activeItem === 'features'} onClick={this.handleItemClick} />
        <Menu.Item name="friends" active={activeItem === 'friends'} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.handleItemClick} />
        </Menu.Menu>
        <Dropdown text="Shopping" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Header>Categories</Dropdown.Header>
            <Dropdown.Item>Home Goods</Dropdown.Item>
            <Dropdown.Item>Bedroom</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Order</Dropdown.Header>
            <Dropdown.Item>Status</Dropdown.Item>
            <Dropdown.Item>Cancellations</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

export default AppNavbar;
