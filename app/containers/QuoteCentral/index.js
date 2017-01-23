/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';
import FormModal from 'components/FormModal';


// uninstall
// TODO: remove onclick query when add service - DONE
// install
// TODO: query when loaded and save results to state
// autocalc from state
// TODO: each service in state should extract its labortime from the repairtimes state
// requirement
// TODO: ensure that onclick service, adds to cart and gets laborTime

import gql from 'graphql-tag';
import { withApollo, graphql, compose } from 'react-apollo';

import { addToCart, removeFromCart, setLaborTime, setPartsData } from './actions';

import { createStructuredSelector } from 'reselect';
import { selectCart, selectPart } from './selectors';
import selectVehicleDomain from 'containers/QuoteAddVehicle/selectors';

// TODO: 7/10 when back button is clicked, reset selected state
// TODO: 6.7/10 float the buttons ot the right
// TODO: 6.5/10 add conditional rendering: if no vehicle => route back to select vehicle
// TODO: 6/10 make sure the onclick handler for the back button isn't being recreated on every rerender
// TODO: 5.5/10 route back buttom backwards instead of to a specific point
// TODO: 5/10 modularize queries completely with single import

export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {console.log(this.props)}
        {console.log(this.props.vehicle.mid)}
        <QuoteCart props={this.props} />
        <AddServices props={this.props} />
        <Grid.Row>
          <FormModal client={this.props.client} />
          <Button onClick={() => browserHistory.push('/quote/vehicle')} >Back</Button>
        </Grid.Row>
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
    onQueryLoad: (service, laborTime) => {
      console.log(`${service} with labortime of ${laborTime} picked up from query result`)
      dispatch(setLaborTime(service, laborTime));
    },
    onPartsLoad: (service, partsData) => {
      console.log(`service: ${service} parts picked up from query result with partsData object below`);
      console.log(partsData);
      dispatch(setPartsData(service, partsData));
    },
  };
}

const RepairTimes = gql`
  query allRepairTimes($midID: String) {
    allRepairTimes(midID: $midID){
      response
    }
  }
`;

const QuoteCentralRedux = connect(mapStateToProps, mapDispatchToProps)

const withRepairTimesData = graphql(RepairTimes, {
  options: { variables: { midID: 'KAW08823' } }
  //options: ({ownProps}) => ({ variables: { midID: ownProps.vehicle.mid } }),
  /*
  props: ({ ownProps, data: { loading, allRepairTimes } }) => ({
    loading,
    allRepairTimes,
  }),
  */
})

//const withOnClickData = withApollo(QuoteCentral);

export default compose(
  QuoteCentralRedux,
  withApollo,
  withRepairTimesData
)(QuoteCentral);