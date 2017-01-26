/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, Button, Segment, Dimmer, Loader, Image, Message } from 'semantic-ui-react';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';
import StyledFormModal from 'components/FormModal/styled';
import gql from 'graphql-tag';
import { withApollo, graphql, compose } from 'react-apollo';
import { addToCart, removeFromCart, setLaborTime, setPartsData } from './actions';
import { createStructuredSelector } from 'reselect';
import { selectCart, selectPart } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';

// TODO: 7.5/10 Replace request button in message with form modal
// TODO: 7/10 when back button is clicked, reset selected state
// TODO: 6.7/10 float the buttons ot the right
// TODO: 6.5/10 add conditional rendering: if no vehicle => route back to select vehicle
// TODO: 6/10 make sure the onclick handler for the back button isn't being recreated on every rerender
// TODO: 5.5/10 route back buttom backwards instead of to a specific point
// TODO: 5/10 modularize queries completely with single import

export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // conditional render that will either render loading or addservices component
    const vehicleSearchTerm = `${this.props.vehicle.year} ${this.props.vehicle.manufacturer} ${this.props.vehicle.model_variant}`
    const loadingMessage = `Loading Services for ${vehicleSearchTerm}`;
    let renderAddServicesUponRepairTimesFetch = null
    if(this.props.allRepairTimesLoading){
      renderAddServicesUponRepairTimesFetch = <Segment>
        <Dimmer active inverted>
          <Loader inverted content={loadingMessage} />
        </Dimmer>
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>;
    }  else {
      renderAddServicesUponRepairTimesFetch = <AddServices props={this.props} />;
    }
    //

    let selectedUnavailableServices = Object.keys(this.props.cart).filter((key) => {
      return this.props.cart[key].selected && this.props.cart[key].unavailable
    }).
      map((serviceName) => {
      let spacedServiceName = serviceName.replace(/([a-z])([A-Z])/g, '$1 $2');
      return (
      <Message.Item key={serviceName}>
        {spacedServiceName}
      </Message.Item>
      )
    })

    let conditionalServicesMessage = null
    if(!this.props.allRepairTimes && !this.props.allRepairTimesLoading){
      conditionalServicesMessage =
        <Message negative>
          <Message.Header> Uh oh! No Server Connection</Message.Header>
          <Message.Content>
            Please refresh or try again in a few minutes :(
          </Message.Content>
        </Message>
    } else if(selectedUnavailableServices.length > 0){
      conditionalServicesMessage =
        <Message info>
        <Message.Header>
          An instant quote for the <span>{vehicleSearchTerm}</span> is unavailable for the currently selected service(s):
        </Message.Header>
        <Message.List>
          {selectedUnavailableServices}
        </Message.List>
        <Message.Content>
          You can still request a fair quote and we'll send you one you when it is available (feature is currently disabled).
        </Message.Content>
          <Button disabled>Request Custom Quote</Button>
      </Message>
    } else {
      conditionalServicesMessage =
        <Message hidden>
          You can't see me
        </Message>
    }

    return (
      <div>
        {conditionalServicesMessage}
        <QuoteCart props={this.props} />
          {renderAddServicesUponRepairTimesFetch}
        <Button onClick={() => browserHistory.push('/quote/vehicle')} >Change Motorcycle</Button>
        <StyledFormModal client={this.props.client} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
  cart: selectCart(),
  part: selectPart(),
});
// what happens if there is no serviceQuery.response or it fails?
// mutate props of service to true
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
      console.log(`${service} with labortime of ${laborTime} picked up from query result`)
      dispatch(setLaborTime(service, laborTime, unavailable));
    },
    onPartsQuery: (service, partsData) => {
      console.log(`service: ${service} parts picked up from query result with partsData object below`);
      console.log(partsData);
      dispatch(setPartsData(service, partsData));
    },
  };
}

const RepairTimesQuery = gql`
  query allRepairTimes($midID: String) {
    allRepairTimes(midID: $midID){
      response
    }
  }
`;

const QuoteCentralRedux = connect(mapStateToProps, mapDispatchToProps)

const withRepairTimesData = graphql(RepairTimesQuery, {
  options: (ownProps) => ({ variables: { midID: ownProps.vehicle.mid } }),
  props: ({ ownProps, data: { loading, allRepairTimes } }) => ({
    allRepairTimesLoading: loading,
    allRepairTimes,
  }),
})


export default compose(
  QuoteCentralRedux,
  withRepairTimesData,
  withApollo,
)(QuoteCentral);
