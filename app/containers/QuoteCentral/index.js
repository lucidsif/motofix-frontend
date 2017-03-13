/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { Button, Segment, Dimmer, Loader, Image, Message } from 'semantic-ui-react';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';
import gql from 'graphql-tag';
import { withApollo, graphql, compose } from 'react-apollo';
import { addToCart, removeFromCart, setLaborTime, setPartsData, setSavedQuoteTrue, setOwnPartsTrue, setOwnPartsFalse, setVoucherTrue, setVoucherFalse } from './actions';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from 'containers/App/selectors';
import { selectCart, selectPart, selectSavedQuote, selectUseOwnParts, selectVoucherCodeStatus } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';

const VehicleIsSelected = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: (state) => state.get('quoteAddVehicle').toJS(),
  predicate: (state) => state.mid,
  failureRedirectPath: '/quote/vehicle',
  wrapperDisplayName: 'VehicleIsSelected',
});

export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function

  onSaveBtnClick() {
    // only allow if authenticated and localToken exists
    if (this.props.authenticated && localStorage.getItem('authToken')) {
      this.createQuoteMutation();
      return this.props.onSaveQuoteClick();
    }
    return browserHistory.push('/login');
  }
// TODO: only dispatch saved button after quote mutation success
  createQuoteMutation() {
  // noinspection JSUnresolvedFunction
    let voucherCodeStatusBool;
    if (!this.props.voucherCodeStatus) {
      voucherCodeStatusBool = false;
    } else {
      voucherCodeStatusBool = this.props.voucherCodeStatus;
    }
    if (this.props.authenticated) {
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
      });
    }
    return browserHistory.push('/login');
  }

  render() {
    // conditional render that will either render loading or addservices component
    const vehicleSearchTerm = `${this.props.vehicle.year} ${this.props.vehicle.manufacturer} ${this.props.vehicle.model_variant}`;
    const loadingMessage = `Loading Services for ${vehicleSearchTerm}`;
    let renderAddServicesUponRepairTimesFetch = null;
    if (this.props.allRepairTimesLoading) {
      renderAddServicesUponRepairTimesFetch =
        (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted content={loadingMessage} />
            </Dimmer>
            <Image src="https://semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        );
    } else {
      renderAddServicesUponRepairTimesFetch = <AddServices props={this.props} />;
    }
    const selectedUnavailableServices = Object.keys(this.props.cart).filter((key) => this.props.cart[key].selected && this.props.cart[key].unavailable)
      .map((serviceName) => {
        const spacedServiceName = serviceName.replace(/([a-z])([A-Z])/g, '$1 $2');
        return (
          <Message.Item key={serviceName}>
            {spacedServiceName}
          </Message.Item>
        );
      });

    let conditionalServicesMessage = null;
    if (!this.props.allRepairTimes && !this.props.allRepairTimesLoading) {
      conditionalServicesMessage =
        (
          <Message negative>
            <Message.Header> Uh oh! No Server Connection</Message.Header>
            <Message.Content>
              Please refresh or try again in a few minutes :(
            </Message.Content>
          </Message>
        ); // make sure to write that prices may not be identical to what we have in the db, but it's a price we think is fair
    } else if (this.props.allRepairTimes && JSON.parse(this.props.allRepairTimes.response).unavailable === 'limited') {
      conditionalServicesMessage = (
        <Message warning>
          <Message.Header> {"We've"} reached our max requests for instants quotes today :( </Message.Header>
          <Message.Content>
            You may still get an instant quote and schedule an appointment, but our prices might be slightly lower or higher than our data.
          </Message.Content>
          <Message.Content>
            If you prefer our exact price, please try again after 8PM.
          </Message.Content>
        </Message>
      );
    } else if (selectedUnavailableServices.length > 0) {
      conditionalServicesMessage = (
        <Message warning>
          <Message.Header>
            We {"don't"} have an accurate quote for <span>{vehicleSearchTerm}</span> for the following service(s):
          </Message.Header>
          <Message.List>
            {selectedUnavailableServices}
          </Message.List>
          <Message.Content>
            You may still book this service, but prices may be slightly lower or higher than it should be.
          </Message.Content>
        </Message>
      );
    } else {
      conditionalServicesMessage =
        (
          <Message hidden>
            You cannot see me
          </Message>
        );
    }
    const addedServicesArr = Object.keys(this.props.cart).filter((key) => this.props.cart[key].selected);
    const enabledScheduleButton = <Button color="teal" onClick={() => browserHistory.push('/quote/schedule')}>Schedule Appointment</Button>;
    const disabledScheduleButton = <Button disabled color="teal">Schedule Appointment</Button>;

    return (
      <div>
        {conditionalServicesMessage}
        <QuoteCart props={this.props} />
        {renderAddServicesUponRepairTimesFetch}
        <Button onClick={() => browserHistory.push('/quote/vehicle')} >Change Motorcycle</Button>
        {this.props.quoteSaved &&
        <Button disabled>Quote Saved</Button>
        }
        {!this.props.quoteSaved && // only only to save quote and dispatch action if authenticated
        <Button onClick={() => this.onSaveBtnClick()}>Save Quote</Button>
        }
        { addedServicesArr.length > 0 ? enabledScheduleButton : disabledScheduleButton }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
  vehicle: selectVehicleDomain(),
  cart: selectCart(),
  part: selectPart(),
  quoteSaved: selectSavedQuote(),
  useOwnParts: selectUseOwnParts(),
  voucherCodeStatus: selectVoucherCodeStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCartClick: (service) => {
      dispatch(addToCart(service));
    },
    onTrashClick: (service) => {
      dispatch(removeFromCart(service));
    },
    getAndSetLaborTime: (service, laborTime, unavailable) => {
      dispatch(setLaborTime(service, laborTime, unavailable));
    },
    onPartsQuery: (service, partsData) => {
      dispatch(setPartsData(service, partsData));
      dispatch(setPartsData(service, partsData));
    },
    onSaveQuoteClick: () => {
      dispatch(setSavedQuoteTrue());
    },
    onUseOwnParts: () => {
      dispatch(setOwnPartsTrue());
    },
    onDeUseOwnParts: () => {
      dispatch(setOwnPartsFalse());
    },
    onVoucherValidation: () => {
      dispatch(setVoucherTrue());
    },
    onVoucherInvalidation: () => {
      dispatch(setVoucherFalse());
    },
  };
}

QuoteCentral.propTypes = {
  authenticated: React.PropTypes.bool,
  vehicle: React.PropTypes.object,
  cart: React.PropTypes.object,
  part: React.PropTypes.object,
  allRepairTimes: React.PropTypes.object,
  allRepairTimesLoading: React.PropTypes.bool,
  client: React.PropTypes.object,
  quoteSaved: React.PropTypes.bool,
  onSaveQuoteClick: React.PropTypes.func,
  useOwnParts: React.PropTypes.bool,
  voucherCodeStatus: React.PropTypes.bool,
};

const RepairTimesQuery = gql`
  query allRepairTimes($midID: String!) {
    allRepairTimes(midID: $midID){
      response
    }
  }
`;

const QuoteCentralRedux = connect(mapStateToProps, mapDispatchToProps);

const withRepairTimesData = graphql(RepairTimesQuery, {
  options: (ownProps) => ({ variables: { midID: ownProps.vehicle.mid } }),
  props: ({ ownProps, data: { loading, allRepairTimes } }) => ({
    allRepairTimesLoading: loading,
    allRepairTimes,
    ownProps,
  }),
});


export default compose(
  VehicleIsSelected,
  QuoteCentralRedux,
  withRepairTimesData,
  withApollo,
)(QuoteCentral);
