import React from 'react';
import { connect } from 'react-redux';
import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { addVehicle } from './actions';
import Select from 'react-select';

import yearsData from './years';

let makesData = [];
let makesFactory = [];
let modelsData = [];
let modelsFactory = [];
let year;
let make;
let model;

// TODO: bind the methods in the constructor rather than in a JSX prop
// TODO: refactor to use official api for select menus when available or write in more declarative way
// TODO: add validation to required fields
// TODO: Find a way to query and dispatch actions without the use of file scoped variables
class QuoteAddVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = { yearValue: 2016, makeValue: '', modelValue: '', makeOptions: '', modelOptions: '' };
  }
  updateYearValueAndGetMakes(newValue) {
    this.setState({ yearValue: newValue });
    this.setState({ makeValue: '' });
    this.setState({ modelValue: '' });
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
      this.setState({ makeOptions: makesFactory })
    });
  }
  updateMakeValueAndGetModels(newValue) {
    this.setState({ makeValue: newValue });
    this.setState({ modelValue: '' });
    model = '';
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
      this.setState({ modelOptions: modelsFactory });
    });
  }
  updateModelValue(newValue) {
    this.setState({ modelValue: newValue });
    year = this.state.yearValue;
    make = this.state.makeValue;
    model = newValue;
  }
  render() {
    return (
      <form onSubmit={this.props.onSubmitForm}>
        <h3 className="section-heading">Add your motorcycle</h3>
        <div>
          <label>Select a year </label>
          <Select
            autofocus
            options={yearsData}
            simpleValue
            clearable
            name="selected-year"
            value={this.state.yearValue}
            onChange={this.updateYearValueAndGetMakes.bind(this)}
            searchable={this.state.searchable}
            placeholder="2017"
          />
        </div>
        <div>
          <label>Select a make {makesData.length}, {makesFactory.length} </label>
          <Select
            autofocus
            options={this.state.makeOptions}
            simpleValue
            clearable
            name="selected-make"
            value={this.state.makeValue}
            onChange={this.updateMakeValueAndGetModels.bind(this)}
            searchable={this.state.searchable}
            placeholder="Select a make"
          />
        </div>
        <div>
          <label>Select a model {modelsData.length}, {modelsFactory.length} </label>
          <Select
            autofocus
            options={this.state.modelOptions}
            simpleValue
            clearable
            name="selected-model"
            value={this.state.modelValue}
            onChange={this.updateModelValue.bind(this)}
            searchable={this.state.searchable}
            placeholder="Select a model"
          />
        </div>
        <Button color="teal" floated="right">Next</Button>
      </form>
    );
  }
}

/*
QuoteAddVehicle.propTypes = {
  loading: React.PropTypes.bool,
  motorcycles: React.PropTypes.array,
};
*/

export function mapDispatchToProps(dispatch){
  return {
    onSubmitForm: (evt) => {
      const vehicle = { year, make, model };
      evt.preventDefault();
      if (year && make && model){
        console.log('all fields submitted');
        dispatch(addVehicle(vehicle));
        browserHistory.push('/quote/services');
      } else {
        console.log('please fill out all fields');
        browserHistory.push('/quote/vehicle');
      }
    },
  };
}


QuoteAddVehicle = withApollo(QuoteAddVehicle);

QuoteAddVehicle = connect(null, mapDispatchToProps)(QuoteAddVehicle);

export default QuoteAddVehicle;
