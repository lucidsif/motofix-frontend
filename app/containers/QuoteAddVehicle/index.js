import React from 'react';
import { connect } from 'react-redux';
import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { addVehicle } from './actions';
import Select from 'react-select';

import manufacturerData from './manufacturers';

let makesData = [];
let makesFactory = [];
let modelsData = [];
let modelsFactory = [];
let year;
let make;
let model;
let appended;

// TODO: 6.5/10 refactor to use official api for select menus when available or write in more declarative way
// TODO: 6/10 add validation to required fields
// TODO: 4/10 Find a way to query and dispatch actions without the use of file scoped variables
class QuoteAddVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = { manufacturerValue: null, modelValue: null, subModelValue: null, subModelOptions: null, subModelOptions: null };

    this.updateMakeValueAndGetModels = this.updateMakeValueAndGetModels.bind(this);
    //this.updateMakeValueAndGetModels = this.updateMakeValueAndGetModels.bind(this);
    //this.updateModelValue = this.updateModelValue.bind(this);
  }
  updateMakeValueAndGetModels(newValue) {
    this.setState({ manufacturerValue: newValue });
    this.setState({ makeValue: null });
    this.setState({ modelValue: null });
    console.time('makes');
    this.props.client.query({
      query: gql`
      query allVehicles($filterByYear: String){
        allVehicles(filterByYear: $filterByYear){
          make
        }
      }
      `,
      variables: { filterByYear: newValue },
    }).then((result) => {
      console.timeEnd('makes');
      console.log(result);
      makesData = result.data.allVehicles;
      makesFactory = makesData.map((bike) => {
        return { value: bike.make, label: bike.make };
      });
      this.setState({ subModelOptions: makesFactory });
    });
  }
  /*
  updateMakeValueAndGetModels(newValue) {
    this.setState({ makeValue: newValue });
    this.setState({ modelValue: null });
    model = '';
    console.time('model');
    this.props.client.query({
      query: gql`
      query allVehicles($filterByYear: String, $filterByMake: String){
        allVehicles(filterByYear: $filterByYear, filterByMake: $filterByMake){
          model
        }
      }
      `,
      variables: { filterByYear: this.state.manufacturerValue, filterByMake: newValue },
    }).then((result) => {
      console.timeEnd('model');
      modelsData = result.data.allVehicles;
      modelsFactory = modelsData.map((bike) => {
        return { value: bike.model, label: bike.model };
      });
      this.setState({ subModelOptions: modelsFactory });
    });
  }
  updateModelValue(newValue) {
    this.setState({ modelValue: newValue });
    year = this.state.manufacturerValue;
    make = this.state.makeValue;
    model = newValue;
    appended = `${year} ${make} ${model}`;
  }
  */
  render() {
    return (
      <form onSubmit={this.props.onSubmitForm}>
        <h3 className="section-heading">Add your motorcycle</h3>
        <div>
          <label>Select a year </label>
          <Select
            autofocus
            options={manufacturerData}
            simpleValue
            clearable
            name="selected-year"
            value={this.state.manufacturerValue}
            onChange={this.updateMakeValueAndGetModels}
            searchable={this.state.searchable}
            placeholder="Search or select a year"
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
      const vehicle = { appended, year, make, model };
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
