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

let modelsData = [];
let modelsFactory = [];
let subModelsData = [];
let subModelsFactory = [];
//let year;
//let make;
//let model;
//let appended;

// TODO: 6.5/10 refactor to use official api for select menus when available or write in more declarative way
// TODO: 6/10 add validation to required fields
// TODO: 4/10 Find a way to query and dispatch actions without the use of file scoped variables
class QuoteAddVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = { manufacturerValue: null, modelValue: null, subModelValue: null, yearValue: null, modelOptions: null, subModelOptions: null };

    this.updateManufacturerValueAndGetModels = this.updateManufacturerValueAndGetModels.bind(this);
    this.updateModelValueAndGetSubModels = this.updateModelValueAndGetSubModels.bind(this);
    //this.updateManufacturerValueAndGetModels = this.updateManufacturerValueAndGetModels.bind(this);
    //this.updateModelValue = this.updateModelValue.bind(this);
  }
  updateManufacturerValueAndGetModels(newValue) {
    console.log(newValue);
    this.setState({ manufacturerValue: newValue });
    this.setState({ modelValue: null });
    this.setState({ subModelValue: null });
    this.setState({ yearValue: null})
    console.time('allModels');
    this.props.client.query({
      query: gql`
      query allModels($manufacturer: String){
        allModels(manufacturer: $manufacturer){
          model
          model_id
        }
      }
      `,
      variables: { manufacturer: newValue },
    }).then((result) => {
      console.timeEnd('allModels');
      console.log(result);
      modelsData = result.data.allModels;
      modelsFactory = modelsData.map((bike) => {
        return { value: bike.model_id, label: bike.model };
      });
      console.log(modelsFactory)
      this.setState({ modelOptions: modelsFactory });
    });
  }
  // add logic here somehow to generate a years array or maybe anothe func
  updateModelValueAndGetSubModels(newValue) {
    console.log(newValue);
    this.setState({ modelValue: newValue });
    this.setState({ subModelValue: null });
    this.setState({ yearValue: null})
    console.time('allSubModels');
    this.props.client.query({
      query: gql`
      query allSubModels($modelID: Int){
        allSubModels(modelID: $modelID){
          mid
          model
          model_variant
          start_year
          end_year
        }
      }
      `,
      variables: { modelID: newValue },
    }).then((result) => {
      console.timeEnd('allSubModels');
      console.log(result);
      subModelsData = result.data.allSubModels;
      subModelsFactory = subModelsData.map((bike) => {
        return { value: bike.mid, label: bike.model_variant };
      });
      console.log(subModelsFactory)
      this.setState({ subModelsOptions: subModelsFactory });
    });
  }
  /*
  updateManufacturerValueAndGetModels(newValue) {
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
          <label>Select a make </label>
          <Select
            autofocus
            options={manufacturerData}
            simpleValue
            clearable
            name="selected-manufacturer"
            value={this.state.manufacturerValue}
            onChange={this.updateManufacturerValueAndGetModels}
            searchable={this.state.searchable}
            placeholder="Search or select a make"
          />
        </div>
        <div>
          <label>Select a model </label>
          <Select
            autofocus
            options={this.state.modelOptions}
            simpleValue
            clearable
            name="selected-model"
            value={this.state.modelValue}
            onChange={this.updateModelValueAndGetSubModels}
            searchable={this.state.searchable}
            placeholder="Search or select a model"
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
