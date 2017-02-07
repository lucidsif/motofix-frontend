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
import StyledFormModal from 'components/FormModal/styled';
import gql from 'graphql-tag';
import { withApollo, graphql, compose } from 'react-apollo';
import { addToCart, removeFromCart, setLaborTime, setPartsData, setSavedQuoteTrue } from './actions';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from 'containers/App/selectors';
import { selectCart, selectPart, selectSavedQuote } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';


const VehicleIsSelected = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: (state) => state.get('quoteAddVehicle').toJS(),
  predicate: (state) => state.mid,
  failureRedirectPath: '/quote/vehicle',
  wrapperDisplayName: 'VehicleIsSelected',
});

export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log('quotecentral props:');
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
            <Image src="http://semantic-ui.com/images/wireframe/short-paragraph.png" />
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
        );
    } else if (this.props.allRepairTimes && JSON.parse(this.props.allRepairTimes.response).unavailable === 'limited') {
      conditionalServicesMessage = (
        <Message negative>
          <Message.Header> Uh oh! We reached max API calls reached for the day :( </Message.Header>
          <Message.Content>
            Please try again after 8PM next day.
          </Message.Content>
        </Message>
      );
    } else if (selectedUnavailableServices.length > 0) {
      conditionalServicesMessage = (
        <Message info>
          <Message.Header>
            An instant quote for the <span>{vehicleSearchTerm}</span> is unavailable for the currently selected service(s):
          </Message.Header>
          <Message.List>
            {selectedUnavailableServices}
          </Message.List>
          <Message.Content>
           You can still request a fair quote and we will send you one you when it is available (feature is currently disabled).
          </Message.Content>
          <Button disabled>Request Custom Quote</Button>
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

    return (
      <div>
        {conditionalServicesMessage}
        <QuoteCart props={this.props} />
        {renderAddServicesUponRepairTimesFetch}
        <Button onClick={() => browserHistory.push('/quote/vehicle')} >Change Motorcycle</Button>
        <Button>Save Quote</Button>
        <StyledFormModal client={this.props.client} />
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
});

function mapDispatchToProps(dispatch) {
  return {
    onCartClick: (service) => {
      dispatch(addToCart(service));
    },
    onTrashClick: (service) => {
      dispatch(removeFromCart(service));
    },
    // TODO: change name to something more fitting
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
  };
}

QuoteCentral.propTypes = {
  authenticated: React.PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  vehicle: React.PropTypes.object,
  cart: React.PropTypes.object,
  allRepairTimes: React.PropTypes.object,
  allRepairTimesLoading: React.PropTypes.bool,
  client: React.PropTypes.object,
};

const RepairTimesQuery = gql`
  query allRepairTimes($midID: String) {
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

  /*
   <h4 className="ui horizontal header divider">What are you waiting for?</h4>
   <p>{"We believe you'll love us so much that we're giving you an additional $15 off your next service if you sign up during this beta period."}</p>
   <FormModal client={this.props.client} />
   </div>
   */