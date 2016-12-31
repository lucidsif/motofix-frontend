import React from 'react';
import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Select from 'react-select';
import yearsData from './years';

let makesData = [];
let makesFactory = [];
let modelsData = [];
let modelsFactory = [];

class QuoteAddVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = { yearValue: 1990, makeValue: '', modelValue: '' };
  }
  updateYearValue(newValue) {
    this.setState({ yearValue: newValue });
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
        console.dir(`yearsdata: ${makesData}, makesfactory: ${makesFactory}`);
    });
  }
  //// make
  updateMakeValue(newValue) {
    this.setState({ makeValue: newValue });
    this.props.client.query({
      query: gql`
      query allMotorcycles($filterByYear: String, $filterByMake: String){
        allMotorcycles(filterByYear: $filterByYear, filterByMake: $filterByMake){
          id
          model
        }
      }
      `,
      variables: { filterByYear: this.state.yearValue, filterByMake: newValue },
    }).then((result) => {
      modelsData = result.data.allMotorcycles;
      modelsFactory = modelsData.map((bike) => {
        return { value: bike.model, label: bike.model };
      });
      console.dir(`modelsdata: ${modelsData}, modelsfactory: ${modelsFactory}`);
    });
  }
//// model
  updateModelValue(newValue) {
    this.setState({ modelValue: newValue });
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
            name="selected-make"
            value={this.state.makeValue}
            onChange={this.updateMakeValue.bind(this)}
            searchable={this.state.searchable}
            placeholder="Select a make"
          />
        </div>
        <div>
          <h3>Select a model {modelsData.length}, {modelsFactory.length} </h3>
          <Select
            ref="stateSelect"
            autofocus
            options={modelsFactory}
            simpleValue
            clearable
            name="selected-model"
            value={this.state.modelValue}
            onChange={this.updateModelValue.bind(this)}
            searchable={this.state.searchable}
            placeholder="Select a model"
          />
        </div>
      </div>
    );
  }
}

/*
QuoteAddVehicle.propTypes = {
  loading: React.PropTypes.bool,
  motorcycles: React.PropTypes.array,
};
*/

// Decorate with react-apollo

QuoteAddVehicle = withApollo(QuoteAddVehicle);

export default QuoteAddVehicle;
