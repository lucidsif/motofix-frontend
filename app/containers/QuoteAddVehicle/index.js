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

let modelData = [];
let modelsFactory = [];
let subModelData = [];
let subModelFactory = [];
let motorcycle;

// TODO: 6.5/10 refactor to use official api for select menus when available or write in more declarative way
// TODO: 6/10 add validation to required fields
// TODO: 4/10 Find a way to query and dispatch actions without the use of file scoped variables
class QuoteAddVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      manufacturerValue: null,
      modelValue: null,
      subModelValue: null,
      yearValue: null,
      modelOptions: null,
      subModelOptions: null,
      yearOptions: null
    };

    this.updateManufacturerValueAndGetModels = this.updateManufacturerValueAndGetModels.bind(this);
    this.updateModelValueAndGetSubModels = this.updateModelValueAndGetSubModels.bind(this);
    this.updateSubModelValueAndRenderYears = this.updateSubModelValueAndRenderYears.bind(this)
    this.updateYear = this.updateYear.bind(this)
  }
  updateManufacturerValueAndGetModels(newValue) {
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
      modelData = result.data.allModels;
      modelsFactory = modelData.map((bike) => {
        return { value: bike.model_id, label: bike.model };
      });
      this.setState({ modelOptions: modelsFactory });
    });
  }
  // add logic here somehow to generate a years array or maybe anothe func
  updateModelValueAndGetSubModels(newValue) {
    this.setState({ modelValue: newValue });
    this.setState({ subModelValue: null });
    this.setState({ yearValue: null})
    console.time('allSubModels');
    this.props.client.query({
      query: gql`
      query allSubModels($modelID: Int){
        allSubModels(modelID: $modelID){        
          mid
          manufacturer
          model
          model_variant
          tuning_description
          start_year
          end_year
        }
      }
      `,
      variables: { modelID: newValue },
    }).then((result) => {
      console.timeEnd('allSubModels');
      subModelData = result.data.allSubModels;
      subModelFactory = subModelData.map((bike) => {
        let bikeLabel = `${bike.model_variant} ${bike.tuning_description || ''} - [${bike.start_year} - ${bike.end_year}]`
        return { value: bike.mid, label: bikeLabel };
      });
      this.setState({ subModelOptions: subModelFactory });

    });
  }

  updateSubModelValueAndRenderYears(newValue) {
    console.time('years');
    this.setState({ subModelValue: newValue });
    this.setState({ yearValue: null})
    let selectedSubModel = subModelData.filter((bike) =>  {
      return bike.mid === newValue
    });
    motorcycle = selectedSubModel[0]
    let yearsArr = []
    createYearsArr(selectedSubModel[0].start_year, selectedSubModel[0].end_year)
    this.setState({ yearOptions: yearsArr })

    function createYearsArr(startYear, endYear){
      let currYear = startYear
      if(currYear <= endYear){
        yearsArr.push({ value: startYear, label: startYear })
        currYear += 1
        return createYearsArr(currYear, endYear)
      }
    }
  }

  updateYear(newValue){
    motorcycle.year = newValue
    this.setState({ yearValue: newValue })
  }

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
        <div>
          <label>Select a sub-model </label>
          <Select
            autofocus
            options={this.state.subModelOptions}
            simpleValue
            clearable
            name="selected-submodel"
            value={this.state.subModelValue}
            onChange={this.updateSubModelValueAndRenderYears}
            searchable={this.state.searchable}
            placeholder="Search or select a sub-model"
          />
        </div>
        <div>
          <label>Select a year </label>
          <Select
            autofocus
            options={this.state.yearOptions}
            simpleValue
            clearable
            name="selected-year"
            value={this.state.yearValue}
            onChange={this.updateYear}
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
      /*
      evt.preventDefault();
      console.log('mock vehicle selected and merged to state')
      const vehicle = {
        mid: 'HDA06327',
        manufacturer: 'Honda',
        model: 'CBR',
        model_variant: 'CBR600',
        tuning_description: 'SE',
        start_year: 2008,
        end_year: 2011,
        year: 2010
      }
      dispatch(addVehicle(vehicle))
      browserHistory.push('/quote/services');
      */
      evt.preventDefault();
      if (motorcycle) {
        console.log('all fields submitted');
        console.log(motorcycle)
        dispatch(addVehicle(motorcycle));
        browserHistory.push('/quote/services');
      } else {
        console.log('please fill out all fields');
        // browserHistory.push('/quote/vehicle');
      }
    },
  };
}


QuoteAddVehicle = withApollo(QuoteAddVehicle);

QuoteAddVehicle = connect(null, mapDispatchToProps)(QuoteAddVehicle);

export default QuoteAddVehicle;
