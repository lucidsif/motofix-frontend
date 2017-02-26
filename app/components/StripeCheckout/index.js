/**
*
* StripeCheckout
*
*/

import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { withApollo, compose } from 'react-apollo';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from 'containers/App/selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';
import { selectCart, selectPart, selectSavedQuote, selectUseOwnParts } from 'containers/QuoteCentral/selectors';
import { setSavedQuoteTrue } from 'containers/QuoteCentral/actions';
import StripeCheckoutComp from 'react-stripe-checkout';
import { services } from 'components/QuoteCart';

class StripeCheckout extends React.Component {
  totalPartsPrice() { // eslint-disable-line react/sort-comp
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
            /* if engine oil part, cut price in half*/
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

  // TODO: 9/10 when you get autodata api, you must extract the right key-value  here
  totalServicesPrice() {
  // return N/A if any selected service has an unavailable labortime
    const selectedUnavailableServices = Object.keys(this.props.cart).filter((key) => this.props.cart[key].selected && this.props.cart[key].unavailable);

    if (selectedUnavailableServices && selectedUnavailableServices.length > 0) {
      return -9;
    }

    const sumOfLaborTimes = services.map((service) => {
      const regexedService = service.replace(/\s/g, '');
      return regexedService;
    })
    .reduce((acc, curr) => {
      if (this.props.cart[curr].selected && typeof this.props.cart[curr].laborTime === 'number') {
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
    const total = subTotal + tax;
    return parseFloat(Math.round(total * 1) / 1);
  }

  // TODO: following:
  // fix go back button?
// get total from quotecart
// create stripe charge(graphql mutation =>
// save quote (graphql mutation, get cart, vehicle, and part from props) =>
// save appointment(graphql mutation, get address from props) =>
// save mobile (graphql mutation, get mobile number from props)
  onToken = (token) => {
    const extractedToken = token;
    extractedToken.amount = this.totalPrice() * 100; // dynamic
    const stringifiedToken = JSON.stringify(extractedToken);
    console.log(stringifiedToken);
    if (this.props.authenticated) {
      return this.props.client.mutate({
        mutation: gql`
       mutation createUserQuote($token: String!, $motorcycleJSON: JSON!, $cartJSON: JSON!, $partJSON: JSON!, $useOwnParts: Boolean!){
        createUserQuote(token: $token, motorcycleJSON: $motorcycleJSON, cartJSON: $cartJSON, partJSON: $partJSON, useOwnParts: $useOwnParts){
          id
          fk_user_id
          motorcycle_json
          cart_json
          part_json
          use_own_parts
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
          useOwnParts: this.props.useOwnParts,
        },
      }).then((response) => {
        this.props.onSaveQuoteClick();
        return response.data.createUserQuote.id;
      })
        .then((quoteID) => {
          return this.props.client.mutate({
            mutation: gql`
           mutation createUserAppointment($token: String!, $motorcycle_address: String!, $contact_name: String!, $contact_number: String!, $estimated_start_time: String!, $estimated_end_time: String!, $status: String!, $fk_quote_id: Int!, $fk_mechanic_id: Int! ){
             createUserAppointment(token: $token, motorcycle_address: $motorcycle_address, contact_name: $contact_name, contact_number: $contact_number, estimated_start_time: $estimated_start_time, estimated_end_time: $estimated_end_time, status: $status, fk_quote_id: $fk_quote_id, fk_mechanic_id: $fk_mechanic_id){
               id
               motorcycle_address
               contact_name
               contact_number
               estimated_start_time
               estimated_end_time
               status
               fk_quote_id
               fk_mechanic_id
               fk_user_id
             }
           }
            `,
            variables: {
              token: localStorage.getItem('authToken'),
              motorcycle_address: this.props.calendarAppointmentState.motorcycle_address,
              contact_name: this.props.calendarAppointmentState.contact_name,
              contact_number: this.props.calendarAppointmentState.contact_number,
              estimated_start_time: this.props.calendarAppointmentState.selectedTimeSlot.start,
              estimated_end_time: this.props.calendarAppointmentState.selectedTimeSlot.end,
              status: 'pending',
              fk_quote_id: quoteID,
              fk_mechanic_id: this.props.calendarAppointmentState.selectedTimeSlot.mechanic,
            },
          });
        })
        .then((appointmentResult) => {
        console.log(appointmentResult.data.createUserAppointment);
        });
    }
  }

  render() {
    return (
      // ...
      <StripeCheckoutComp
        name="motofix"
        description="Your personal mechanic anywhere"
        image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png"
        token={this.onToken}
        stripeKey="pk_test_Uq1Klar8ByVNEJGycRrPLA3X"
        panelLabel="Pay"
        currency="USD"
        email="test44@email.com" // make dynamic
        allowRememberMe
        zipcode
      >
        <button className="ui teal button">Pay with card</button>
      </StripeCheckoutComp>
    );
  }
}

StripeCheckout.propTypes = {
  cart: React.PropTypes.object,
  part: React.PropTypes.object,
  useOwnParts: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
  vehicle: selectVehicleDomain(),
  cart: selectCart(),
  part: selectPart(),
  quoteSaved: selectSavedQuote(),
  useOwnParts: selectUseOwnParts(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveQuoteClick: () => {
      dispatch(setSavedQuoteTrue());
    },
  };
}

const StripeCheckoutRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  StripeCheckoutRedux,
  withApollo,
)(StripeCheckout);

