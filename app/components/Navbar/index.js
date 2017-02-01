/**
*
* Navbar
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from 'containers/App/selectors';
import { deAuthenticateUser } from 'containers/App/actions';
import { selectCart, selectPart } from 'containers/QuoteCentral/selectors';
import { resetCart, resetPart, resetSavedQuote } from 'containers/QuoteCentral/actions';
import { resetVehicle } from 'containers/QuoteAddVehicle/actions';
import { browserHistory } from 'react-router';
import { Dropdown, Menu, Image, Icon, Label } from 'semantic-ui-react';
import logo from './home-logo.png';
import { services } from 'components/QuoteCart';

// TODO: resetSavedQuote should reset cart and part as well!


// TODO: 7/10 when cart is clicked, it should route to quotecart
// TODO: handle edge cases like if props is null
// TODO: 5/10 export all calculating functions into a utility functions file
export class AppNavBar extends React.Component {
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
    services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
    .reduce((acc, curr) => {
      if (this.props.cart[curr].selected && this.props.part[curr]) {
        console.log(`${curr} is selected and a part exists for it`);
        // serviceparts shouls be an array of parts belonging to a service
        const servicePartKeys = Object.keys(this.props.part[curr]);
        console.log(servicePartKeys);
        return servicePartKeys.reduce((accu, currKey) => {
          if (this.props.part[curr][currKey].valid) {
            /* eslint no-underscore-dangle: ["error", { "allow": ["price_", "__value__"] }] */
            const price = parseFloat(this.props.part[curr][currKey].price.__value__);
            const quantity = parseFloat(this.props.part[curr][currKey].quantity);
            sum += price * quantity;
            return sum;
          }
          return sum;
        }, 0);
      }
      return acc + 0;
    }, 0);
    return sum;
  }
  totalServicesPrice() {
    const selectedUnavailableServices = Object.keys(this.props.cart).filter((key) =>
       this.props.cart[key].selected && this.props.cart[key].unavailable
    );
    if (selectedUnavailableServices && selectedUnavailableServices.length > 0) {
      console.log(selectedUnavailableServices);
      return 'N/A';
    }

    const sumOfLaborTimes = services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
    .reduce((acc, curr) => {
      if (this.props.cart[curr].selected && typeof this.props.cart[curr].laborTime === 'number') {
        const laborTime = this.props.cart[curr].laborTime;
        console.log(`service: ${curr} with labortime: ${laborTime} is selected`);
        return acc + laborTime;
      }
      return acc + 0;
    }, 0);
    return sumOfLaborTimes * 67;
  }

  totalPrice() {
    const subTotal = this.totalServicesPrice() + this.totalPartsPrice();

    const taxRate = 0.0875;
    const tax = subTotal * taxRate;

    const total = subTotal + tax;
    return parseFloat(Math.round(total * 1) / 1);
  }

 // TODO: link to quote/services by clicking on cart button without breaking page style and only link if vehicle exists

  render() {
    console.log('navbar props');
    console.log(this.props);
    return (
      <Menu secondary fixed="top" className="padRight">
        <Menu.Item>
          <Image src={logo} size="tiny" href="#" onClick={() => browserHistory.push('/')} />
          <Label color="orange" horizontal className="betaLabel">beta</Label>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Label color="teal">
              <Icon name="in cart" /> ${this.totalPrice()}
            </Label>
          </Menu.Item>
        </Menu.Menu>
        <Dropdown className="link item" icon="bars">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.props.onNewQuoteClick()}>New Quote</Dropdown.Item>
            <Dropdown.Item onClick={() => browserHistory.push('/dashboard/quotes')}>Saved Quotes</Dropdown.Item>
            {this.props.authenticated &&
            <Dropdown.Item onClick={() => { localStorage.removeItem('authToken'); this.props.onDeAuthentication(); }}> Sign Out</Dropdown.Item>
            }
            {!this.props.authenticated &&
            <Dropdown.Item onClick={() => browserHistory.push('/login')}>Log In</Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
  }
}

AppNavBar.propTypes = {
  authenticated: React.PropTypes.bool,
  onDeAuthentication: React.PropTypes.func,
  onNewQuoteClick: React.PropTypes.func,
  cart: React.PropTypes.object,
  part: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
  cart: selectCart(),
  part: selectPart(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDeAuthentication: () => {
      dispatch(deAuthenticateUser());
    },
    onNewQuoteClick: () => {
      dispatch(resetVehicle());
      dispatch(resetCart());
      dispatch(resetPart());
      dispatch(resetSavedQuote());
      browserHistory.push('/quote/vehicle');
    },
  };
}

const AppNavBarConnect = connect(mapStateToProps, mapDispatchToProps)(AppNavBar);

export default AppNavBarConnect;
