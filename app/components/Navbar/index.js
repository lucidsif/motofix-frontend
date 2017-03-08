/**
*
* Navbar
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from 'containers/App/selectors';
import { deAuthenticateUser, resetUserId } from 'containers/App/actions';
import { selectMid } from 'containers/QuoteAddVehicle/selectors';
import { selectCart, selectPart, selectUseOwnParts, selectVoucherCodeStatus } from 'containers/QuoteCentral/selectors';
import { resetCart, resetPart, resetSavedQuote, setVoucherNull } from 'containers/QuoteCentral/actions';
import { resetVehicle } from 'containers/QuoteAddVehicle/actions';
import { browserHistory } from 'react-router';
import { Dropdown, Menu, Image, Icon, Label, Button } from 'semantic-ui-react';
import logo from './home-logo.png';
import services from 'containers/QuoteCentral/reducerServices';

// TODO: make sure new quote sets voucher to null
// TODO: 7/10 new quote should reset paid to null - create a new action creator and handle it in reducer
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
        // serviceparts shouls be an array of parts belonging to a service
        const servicePartKeys = Object.keys(this.props.part[curr]);
        return servicePartKeys.reduce((accu, currKey) => {
          if (this.props.part[curr][currKey].valid) {
            /* eslint no-underscore-dangle: ["error", { "allow": ["price_", "__value__"] }] */
            const price = this.props.part[curr][currKey] === this.props.part[curr].EngineOil ? parseFloat(this.props.part[curr][currKey].price.__value__ / 2) : parseFloat(this.props.part[curr][currKey].price.__value__);
            const quantity = parseFloat(this.props.part[curr][currKey].quantity);
            sum += price * quantity;
            return sum;
          }
          return sum;
        }, 0);
      }
      return acc + 0;
    }, 0);
    // if using own parts, return 0 for parts cost
    if (!this.props.useOwnParts) {
      return sum;
    }
    return 0;
  }
  totalServicesPrice() {
    const selectedUnavailableServices = Object.keys(this.props.cart).filter((key) =>
       this.props.cart[key].selected && this.props.cart[key].unavailable
    );
    if (selectedUnavailableServices && selectedUnavailableServices.length > 0) {
      return -9;
    }

    const sumOfLaborTimes = services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
    .reduce((acc, curr) => {
      if (this.props.cart[curr].selected && this.props.cart[curr].laborTime) {
        const laborTime = this.props.cart[curr].laborTime;
        return acc + laborTime;
      }
      return acc + 0;
    }, 0);
    return sumOfLaborTimes * 67 * 2;
  }

  totalPrice() {
    const subTotal = this.totalServicesPrice() + this.totalPartsPrice();

    const taxRate = 0.0875;
    const tax = subTotal * taxRate;

    let total = subTotal + tax;
    if (this.props.voucherCodeStatus) {
      total -= 15;
    }
    return parseFloat(Math.round(total * 1) / 1);
  }

  ifNegativeNum(num) {
    if (num < 0) {
      return 'n/a';
    }
    return num;
  }

 // TODO: link to quote/services by clicking on cart button without breaking page style and only link if vehicle exists

  render() {
    return (
      <Menu secondary fixed="top" className="padRight ">
        <Menu.Item>
          <Image src={logo} as="a" size="tiny" href="#" onClick={() => browserHistory.push('/')} />
          <Label color="orange" horizontal className="betaLabel">beta</Label>
        </Menu.Item>
        <Menu.Item position="left">
          <form action="tel:9293564313">
            <Button
              type="submit"
              icon="call"
              content="Need Help? Call Support"
              color="blue"
              circular
            />
          </form>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            {this.props.vehicleMid &&
            <Label as="a" color="teal" onClick={() => browserHistory.push('quote/services')}>
              <Icon name="in cart" /> ${this.ifNegativeNum(this.totalPrice())}
            </Label>
            }
            {!this.props.vehicleMid &&
              <Label color="teal">
                <Icon name="in cart" /> ${this.ifNegativeNum(this.totalPrice())}
              </Label>
            }
          </Menu.Item>
        </Menu.Menu>
        <Dropdown className="link item" icon="bars">
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => browserHistory.push('/dashboard')}>Dashboard</Dropdown.Item>
            <Dropdown.Item onClick={() => this.props.onNewQuoteClick()}>New Quote</Dropdown.Item>
            <Dropdown.Item onClick={() => browserHistory.push('/dashboard/quotes')}>Saved Quotes</Dropdown.Item>
            {this.props.authenticated &&
            <Dropdown.Item onClick={() => { localStorage.removeItem('authToken'); this.props.onDeAuthentication(); browserHistory.push('/login'); }}> Log Out</Dropdown.Item>
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
  vehicleMid: React.PropTypes.string,
  onDeAuthentication: React.PropTypes.func,
  onNewQuoteClick: React.PropTypes.func,
  cart: React.PropTypes.object,
  part: React.PropTypes.object,
  useOwnParts: React.PropTypes.bool,
  voucherCodeStatus: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
  vehicleMid: selectMid(),
  cart: selectCart(),
  part: selectPart(),
  useOwnParts: selectUseOwnParts(),
  voucherCodeStatus: selectVoucherCodeStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDeAuthentication: () => {
      dispatch(deAuthenticateUser());
      dispatch(resetUserId());
    },
    onNewQuoteClick: () => {
      browserHistory.push('/quote/vehicle');
      dispatch(resetVehicle());
      dispatch(resetCart());
      dispatch(resetPart());
      dispatch(resetSavedQuote());
      dispatch(setVoucherNull());
    },
  };
}

const AppNavBarConnect = connect(mapStateToProps, mapDispatchToProps)(AppNavBar);

export default AppNavBarConnect;
