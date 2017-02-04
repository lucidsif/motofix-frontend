import React from 'react';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Message, Label, Input, Divider } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { addVehicle } from './actions';
import Select from 'react-select';
import { createStructuredSelector } from 'reselect';
import selectVehicleDomain from './selectors';

import manufacturerData from './manufacturers';

let modelData = [];
let modelsFactory = [];
let subModelData = [];
let subModelFactory = [];
let zipcode;
let motorcycle;

// TODO: detect ip address using ipinfo.io
// TODO: Clean up validation logic and shit like file level variables
// TODO: 7/10 half the size of the select menus
// TODO: 6.5/10 refactor to use official api for select menus when available or write in more declarative way
// TODO: 6/10 replace spans with labels
// TODO: 4/10 Find a way to query and dispatch actions without the use of file scoped variables
class QuoteAddVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zipcode: null,
      manufacturerValue: null,
      modelValue: null,
      subModelValue: null,
      yearValue: null,
      modelOptions: null,
      subModelOptions: null,
      yearOptions: null,
      asyncError: false,
      motorcycleSelected: null,
    };

    this.updateManufacturerValueAndGetModels = this.updateManufacturerValueAndGetModels.bind(this);
    this.updateModelValueAndGetSubModels = this.updateModelValueAndGetSubModels.bind(this);
    this.updateSubModelValueAndRenderYears = this.updateSubModelValueAndRenderYears.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.conditionalAsyncErrorMessage = this.conditionalAsyncErrorMessage.bind(this);
    this.validateAndUpdateZip = this.validateAndUpdateZip.bind(this);
    this.validateMotorcycleForm = this.validateMotorcycleForm.bind(this);
  }
  updateManufacturerValueAndGetModels(newValue) {
    this.setState({ manufacturerValue: newValue });
    this.setState({ modelValue: null });
    this.setState({ subModelValue: null });
    this.setState({ yearValue: null });
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
      modelsFactory = modelData.map((bike) => ({ value: bike.model_id, label: bike.model }));
      this.setState({ modelOptions: modelsFactory });
    })
      .catch((err) => {
        console.log(err);
        this.setState({ asyncError: true });
      });
  }
  // add logic here somehow to generate a years array or maybe anothe func
  updateModelValueAndGetSubModels(newValue) {
    this.setState({ modelValue: newValue });
    this.setState({ subModelValue: null });
    this.setState({ yearValue: null });
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
        const bikeLabel = `${bike.model_variant} ${bike.tuning_description || ''} - [${bike.start_year} - ${bike.end_year}]`;
        return { value: bike.mid, label: bikeLabel };
      });
      this.setState({ subModelOptions: subModelFactory });
    })
      .catch((err) => {
        console.log(err);
        this.setState({ asyncError: true });
      });
  }

  updateSubModelValueAndRenderYears(newValue) {
    console.time('years');
    this.setState({ subModelValue: newValue });
    this.setState({ yearValue: null });
    const selectedSubModel = subModelData.filter((bike) => bike.mid === newValue);
    motorcycle = selectedSubModel[0];
    const yearsArr = [];
    createYearsArr(selectedSubModel[0].start_year, selectedSubModel[0].end_year);
    this.setState({ yearOptions: yearsArr });

    function createYearsArr(startYear, endYear) {
      let currYear = startYear;
      if (currYear <= endYear) {
        yearsArr.push({ value: startYear, label: startYear });
        currYear += 1;
        return createYearsArr(currYear, endYear);
      }
      return yearsArr;
    }
  }

  updateYear(newValue) {
    motorcycle.year = newValue;
    this.setState({ yearValue: newValue });
  }

  conditionalAsyncErrorMessage() {
    const error = this.state.asyncError;
    if (error) {
      return (
        <Message negative>
          <p>Warning: Max API calls reached for the day :(</p>
          <p>We have a limited # of API calls to our data provider until they upgrade us. Please try again after 8PM EST next day.</p>
        </Message>
      );
    }
    return null;
  }

  validateAndUpdateZip(evt) {
    const isValid = /^\b\d{5}(-\d{4})?\b$/.test(evt.target.value);
    if (isValid) {
      console.log('zip is valid');
      zipcode = parseInt(evt.target.value, 10);
      return this.setState({ zipcode });
    }
    console.log('invalid zip');
    zipcode = false;
    return this.setState({ zipcode: false });
  }

  validateMotorcycleForm(e) {
    e.preventDefault();
    //TODO: Comment these out in production. WHY AREN"T THESE SETTING?
    this.setState({ manufacturerValue: 'Honda' });
    console.log(this.state.manufacturerValue);
    this.setState({ modelValue: 'CBR' });
    this.setState({ subModelValue: 'CBR600' });
    this.setState({ yearValue: 2005 });

    if (!this.state.zipcode) {
      return this.setState({ zipcode: false });
    }
    /*
    if (!this.state.manufacturerValue) {
      this.setState({ manufacturerValue: false });
    }
    if (!this.state.modelValue) {
      this.setState({ modelValue: false });
    }
    if (!this.state.subModelValue) {
      this.setState({ subModelValue: false });
    }
    if (!this.state.yearValue) {
      return this.setState({ yearValue: false });
    }
    */
    console.log('mock vehicle selected and merged to state');
    //TODO: Create actual vehicle object in this format
    const vehicle = {
      zipcode: this.state.zipcode,
      mid: 'HDA06327',
      manufacturer: 'Honda',
      model: 'CBR',
      model_variant: 'CBR600',
      tuning_description: 'SE',
      start_year: 2008,
      end_year: 2011,
      year: 2010,
    };
    return this.props.onSubmitForm(vehicle);
  }

  render() {
    let renderVehicleModel = null;
    const vehicle = this.props.vehicle;
    if (this.props.vehicle.mid) {
      renderVehicleModel = (
        <div>
          <Label>Currently Selected Motorcycle: {vehicle.year} {vehicle.manufacturer} {vehicle.model} ({vehicle.model_variant})</Label>
        </div>
      );
    }
    return (
      <div>
        {renderVehicleModel &&
        <div>{renderVehicleModel}</div>
        }
        <form onSubmit={this.validateMotorcycleForm}>
          {this.conditionalAsyncErrorMessage()}
          <h3 className="section-heading">Motorcycle Information</h3>
          <div>
            <Input
              onBlur={this.validateAndUpdateZip}
              icon="location arrow"
              placeholder="Zipcode of motorcycle"
              size="large"
            />
            {this.state.zipcode === false &&
            <Label basic color="red" pointing="left">Please enter a valid zipcode</Label>
            }
          </div>
          <Divider section horizontal> Select Model</Divider>
          <div>
            <span>Make</span>
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
            {this.state.manufacturerValue === false &&
            <Label basic color="red" pointing>Please select a make</Label>
            }
          </div>
          <div>
            <span>Model </span>
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
            {this.state.modelValue === false &&
            <Label basic color="red" pointing>Please select a model</Label>
            }
          </div>
          <div>
            <span>Sub-model </span>
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
            {this.state.subModelValue === false &&
            <Label basic color="red" pointing>Please select a sub-model</Label>
            }
          </div>
          <div>
            <span>Year </span>
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
            {this.state.yearValue === false &&
            <Label basic color="red" pointing>Please select a year</Label>
            }
          </div>
          <Button color="teal" floated="right">Next</Button>
        </form>
      </div>
    );
  }
}

QuoteAddVehicle.propTypes = {
  client: React.PropTypes.object,
  vehicle: React.PropTypes.object,
  onSubmitForm: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (vehicleObj) => {
      dispatch(addVehicle(vehicleObj));
      browserHistory.push('/quote/services');
      /* this code will not exist here
      if (motorcycle) {
        console.log('all fields submitted');
        dispatch(addVehicle(motorcycle));
        browserHistory.push('/quote/services');
      } else {
        console.log('please fill out all fields');
      }
      */
    },
  };
}

const QuoteAddVehicleRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  QuoteAddVehicleRedux,
  withApollo,
)(QuoteAddVehicle);
