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
import { setPaymentSuccess, setPaymentFail } from 'containers/QuoteAppointmentScheduler/actions';
import StripeCheckoutComp from 'react-stripe-checkout';
import services from 'containers/QuoteCentral/reducerServices';
import mcIcon from './f6s-logo.png';
import textLogo from './blumotofix72.png';

// TODO: make it receive all the props it needs from the most parent container

// todo: payment response is tightly coupled with quote and appointment mutation
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
    /*
    const selectedUnavailableServices = Object.keys(this.props.cart).filter((key) => this.props.cart[key].selected && this.props.cart[key].unavailable);

    if (selectedUnavailableServices && selectedUnavailableServices.length > 0) {
      return -9;
    }
    */

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
    let total = subTotal + tax;
    if (this.props.voucherCodeStatus) {
      total -= 15;
    }
    return parseFloat(Math.round(total * 1) / 1);
  }

  // TODO:redirect to appointments dashboard after successful payment
  // TODO:add error handling for appointments and quotes mutations
  // TODO: send a text message and email after successful payment

  // get token from stripe client => inject amount in to token => send to server to create charge
  // if stripe charged successfully, create a quote and then create an appointment referencing the quote id of the created quote and then redeem voucher
  onToken = (token) => { // eslint-disable-line consistent-return
    console.log(token);
    const extractedToken = token;
    extractedToken.amount = this.totalPrice() * 100; // dynamic
    const stringifiedToken = JSON.stringify(extractedToken);
    if (this.props.authenticated) {
      return this.props.client.mutate({
        mutation: gql`
       mutation createStripeCharge($token: JSON!){
        createStripeCharge(token: $token){
          response
         }
       }
      `,
        variables: {
          token: stringifiedToken,
        },
      }).then((stripeChargeResponse) => { // eslint-disable-line consistent-return
        console.log(stripeChargeResponse);
        let voucherCodeStatusBool;
        if (!this.props.voucherCodeStatus) {
          voucherCodeStatusBool = false;
          console.log(`false or null, ${voucherCodeStatusBool}`)
        } else {
          voucherCodeStatusBool = this.props.voucherCodeStatus;
          console.log(`true, ${voucherCodeStatusBool}`)
        }
        if (stripeChargeResponse.data.createStripeCharge.response.paid) {
          this.props.onSuccessfulPayment();

          return this.props.client.mutate({
            mutation: gql`
       mutation createUserQuote($token: String!, $motorcycleJSON: JSON!, $cartJSON: JSON!, $partJSON: JSON!, $useOwnParts: Boolean!, $voucherCodeStatus: Boolean!){
        createUserQuote(token: $token, motorcycleJSON: $motorcycleJSON, cartJSON: $cartJSON, partJSON: $partJSON, useOwnParts: $useOwnParts, voucherCodeStatus: $voucherCodeStatus){
          id
          fk_user_id
          motorcycle_json
          cart_json
          part_json
          use_own_parts
          voucher_code_status
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
              voucherCodeStatus: voucherCodeStatusBool,
            },
          }).then((response) => {
            console.log(response.data.createUserQuote);
            this.props.onSaveQuoteClick();
            return response.data.createUserQuote.id;
          }).then((quoteID) => { // eslint-disable-line arrow-body-style
            return this.props.client.mutate({
              mutation: gql`
           mutation createUserAppointment($token: String!, $motorcycle_address: String!, $contact_number: String!, $note: String!, $estimated_start_time: String!, $estimated_end_time: String!, $status: String!, $fk_quote_id: Int!, $fk_mechanic_id: Int! ){
             createUserAppointment(token: $token, motorcycle_address: $motorcycle_address, contact_number: $contact_number, note: $note, estimated_start_time: $estimated_start_time, estimated_end_time: $estimated_end_time, status: $status, fk_quote_id: $fk_quote_id, fk_mechanic_id: $fk_mechanic_id){
               id
               motorcycle_address
               contact_number
               note
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
                contact_number: this.props.calendarAppointmentState.contact_number,
                note: this.props.calendarAppointmentState.note,
                estimated_start_time: this.props.calendarAppointmentState.selectedTimeSlot.start,
                estimated_end_time: this.props.calendarAppointmentState.selectedTimeSlot.end,
                status: 'pending',
                fk_quote_id: quoteID,
                fk_mechanic_id: this.props.calendarAppointmentState.selectedTimeSlot.mechanic,
              },
            })
                .then((appointmentResult) => { // eslint-disable-line arrow-body-style
                  console.log(appointmentResult.data.createUserAppointment);
                  if (voucherCodeStatusBool) {
                    return this.props.client.mutate({
                      mutation: gql`
                    mutation redeemVoucher($voucherCode: String!, $user_id: Int!)   {
                      redeemVoucher(voucherCode: $voucherCode, user_id: $user_id) {
                        response
                        }
                      }
                  `,
                      variables: {
                        user_id: this.props.userId,
                        voucherCode: localStorage.getItem('voucherCode'),
                      },
                    })
                      .then((voucherResult) => {
                        console.log(voucherResult);
                        return this.props.onSuccessfulOrder();
                      });
                  }
                  return this.props.onSuccessfulOrder();
                });
          });
        }
        return this.props.onFailedPayment();
      })
        .catch((err) => {
          console.log(err);
          return this.props.onFailedPayment();
        });
    }
  }

  render() {
    return (
      <StripeCheckoutComp
        name="motofix"
        description="Your personal mechanic anywhere"
        image={mcIcon}
        token={this.onToken}
        stripeKey="pk_test_Uq1Klar8ByVNEJGycRrPLA3X"
        panelLabel="Pay"
        currency="USD"
        email={localStorage.getItem('email')}
        allowRememberMe
        zipcode
      >
        <button className="ui teal button">Pay ${this.totalPrice()} with card</button>
      </StripeCheckoutComp>
    );
  }
}

StripeCheckout.propTypes = {
  authenticated: React.PropTypes.bool,
  userId: React.PropTypes.number,
  client: React.PropTypes.object,
  vehicle: React.PropTypes.object,
  cart: React.PropTypes.object,
  part: React.PropTypes.object,
  useOwnParts: React.PropTypes.bool,
  calendarAppointmentState: React.PropTypes.object,
  onSaveQuoteClick: React.PropTypes.func,
  onFailedPayment: React.PropTypes.func,
  onSuccessfulPayment: React.PropTypes.func,
  voucherCodeStatus: React.PropTypes.bool,
  onSuccessfulOrder: React.PropTypes.func,
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
    onSuccessfulPayment: () => {
      dispatch(setPaymentSuccess());
    },
    onFailedPayment: () => {
      dispatch(setPaymentFail());
    },
  };
}

const StripeCheckoutRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  StripeCheckoutRedux,
  withApollo,
)(StripeCheckout);

