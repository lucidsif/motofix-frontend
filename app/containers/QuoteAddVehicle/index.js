import React from 'react';
import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Select from 'react-select';
import yearsData from './years';

let makesData = [];
let makesFactory = []




class QuoteAddVehicle extends React.Component {

    constructor(props) {
        super(props);
        this.state = { yearValue: 1990, makeValue: '', modelValue: '' };
    }
    updateYearValue(newValue) {
      this.props.client.query({
      query: gql`
      query allMotorcycles($filterByYear: String){
        allMotorcycles(filterByYear: $filterByYear){
          id
          make
        }
      }
      `,
      variables: { filterByYear: newValue },
  }).then((result) => {
    makesData = result.data.allMotorcycles;
    makesFactory = makesData.map((bike) => {
      return { value: bike.make, label: bike.make };
    });
  });
        this.setState({ yearValue: newValue });
      }

    updateMakeValue(newValue) {
      console.log(newValue);
        this.setState({ makeValue: newValue });
      }

    render() {
      return (
      <div>
        <div>
        <h3>Select a year </h3>
        <Select
          ref="stateSelect"
          autofocus
          options={yearsData}
          simpleValue
          clearable
          name="selected-year"
          value={this.state.yearValue}
          onChange={this.updateYearValue.bind(this)}
          searchable={this.state.searchable}
          placeholder="2017"
        />
        </div>
        <div>
        <h3>Select a make {makesData.length}, {makesFactory.length} </h3>
        <Select
          ref="stateSelect"
          autofocus
          options={makesFactory}
          simpleValue
          clearable
          name="selected-year"
          value={this.state.makeValue}
          onChange={this.updateMakeValue.bind(this)}
          searchable={this.state.searchable}
          placeholder="2017"
        />
        </div>
      </div>
      )
    }
}

/*
QuoteAddVehicle.propTypes = {
  loading: React.PropTypes.bool,
  motorcycles: React.PropTypes.array,
  ...propTypes,
};
*/

// Decorate with react-apollo

QuoteAddVehicle = withApollo(QuoteAddVehicle);

export default QuoteAddVehicle;
