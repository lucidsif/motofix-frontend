/**
*
* Navbar
*
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import { Input, Menu } from 'semantic-ui-react';

class AppNavbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary>
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name="messages" active={activeItem === 'messages'} onClick={this.handleItemClick} />
        <Menu.Item name="friends" active={activeItem === 'friends'} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." onClick={this.handleItemClick} />
          </Menu.Item>
          <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default AppNavbar;
