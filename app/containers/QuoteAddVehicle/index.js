import React from 'react';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Message, Label, Divider } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { addVehicle } from './actions';
import Select from 'react-select';
import { createStructuredSelector } from 'reselect';
import selectVehicleDomain from './selectors';
import Geosuggest from 'react-geosuggest';

import manufacturerData, { manufacturerCodes } from './manufacturers';

let modelData = [];
let modelsFactory = [];
let subModelData = [];
let subModelFactory = [];
let motorcycle;

// TODO: force refresh if backup api needs to be used in the middle of selecting a motorcycle
// TODO: 6.5/10 refactor to use official api for select menus when available or write in more declarative way
// TODO: use proper loading render
// TODO: add logic if backup api needs to be used in the middle of selecting a motorcycle
// TODO: 6.6/10 half the size of the select menus
// TODO: 6/10 replace spans with labels
// TODO: 4/10 Find a way to query and dispatch actions without the use of file scoped variables
class QuoteAddVehicle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      manufacturerValue: null,
      modelValue: null,
      subModelValue: null,
      yearValue: null,
      modelOptions: null,
      subModelOptions: null,
      yearOptions: null,
      asyncError: false,
      overDistance: null,
      motorcycleSelected: null,
      backupApi: false,
    };

    this.updateManufacturerValueAndGetModels = this.updateManufacturerValueAndGetModels.bind(this);
    this.updateModelValueAndGetSubModels = this.updateModelValueAndGetSubModels.bind(this);
    this.updateSubModelValueAndGetYears = this.updateSubModelValueAndGetYears.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.conditionalAsyncErrorMessage = this.conditionalAsyncErrorMessage.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onBlurError = this.onBlurError.bind(this);
    this.validateMotorcycleForm = this.validateMotorcycleForm.bind(this);
  }
  updateManufacturerValueAndGetModels(newValue) { // eslint-disable-line react/sort-comp
    this.setState({ manufacturerValue: newValue });
    this.setState({ modelValue: null });
    this.setState({ subModelValue: null });
    this.setState({ yearValue: null });
    console.time('allModels');
    // pseudo loading
    this.setState({ modelOptions: [{ label: 'Loading... (may be initially slow)', value: 'Loading' }] });

    this.props.client.query({
      query: gql`
      query allModels($manufacturer: String!){
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
        console.timeEnd('allModels');
        console.time('allVehicles models');
        this.logException(err);

        // :backup api - get all models of selected make.
        // i. find the object key name (make) associated with the selected make code
        const selectedManufacturerArr = manufacturerCodes.filter((manf) => {
          const objValues = Object.values(manf);
          return objValues[0] === newValue;
        });
        const manufacturerArr = Object.keys(selectedManufacturerArr[0]);
        const manufacturerName = manufacturerArr[0];
        console.log(manufacturerName);

        // ib. turn on backup api switch
        this.setState({ backupApi: true });
        // ii. run a graphql query and get all models that have that make
        this.props.client.query({
          query: gql`
      query allVehicles($filterByMake: String){
        allVehicles(filterByMake: $filterByMake){
          model
        }
      }
      `,
          variables: { filterByMake: manufacturerName },
        }).then((result) => {
          console.timeEnd('allVehicles models');
          // iii. create modelsFactory from that
          // iv. make models options = to modelsFactory
          modelData = result.data.allVehicles;
          modelsFactory = modelData.map((bike) => ({ value: bike.model, label: bike.model }));
          this.setState({ modelOptions: modelsFactory });
        })
          .catch((error) => {
            console.log(error);
            this.logException(err);
          });
      });
  }
  updateModelValueAndGetSubModels(newValue) {
    this.setState({ modelValue: newValue });
    this.setState({ subModelValue: null });
    this.setState({ yearValue: null });

    if (this.state.backupApi) {
      console.time('allVehicles submodels');
      // i. run a graphql query and get all models that have that make
      return this.props.client.query({
        query: gql`
      query allVehicles($filterByModel: String){
        allVehicles(filterByModel: $filterByModel){
          submodel
        }
      }
      `,
        variables: { filterByModel: newValue },
      }).then((result) => {
        console.timeEnd('allVehicles submodels');
        // ii. create modelsFactory from that
        // iii. make models options = to modelsFactory
        subModelData = result.data.allVehicles;
        subModelFactory = subModelData.map((bike) => ({ value: bike.submodel, label: bike.submodel }));
        return this.setState({ subModelOptions: subModelFactory });
      })
        .catch((error) => {
          console.log(error);
          this.logException(error);
        });
    }

    console.time('allSubModels');
    return this.props.client.query({
      query: gql`
      query allSubModels($modelID: Int!){
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
        this.logException(err);
      });
  }

  updateSubModelValueAndGetYears(newValue) {
    this.setState({ subModelValue: newValue });
    this.setState({ yearValue: null });

    if (this.state.backupApi) {
      console.time('allVehicles years');
      // i. run a graphql query and get all models that have that make
      return this.props.client.query({
        query: gql`
      query allVehicles($filterBySubmodel: String){
        allVehicles(filterBySubmodel: $filterBySubmodel){
          year
        }
      }
      `,
        variables: { filterBySubmodel: newValue },
      }).then((result) => {
        console.timeEnd('allVehicles years');
        // ii. create yearsFactory from that
        // iii. make years options = to yearsFactory
        const yearsData = result.data.allVehicles;
        const yearsFactory = yearsData.map((bike) => ({ value: bike.year, label: bike.year }));
        return this.setState({ yearOptions: yearsFactory });
      })
        .catch((error) => {
          console.log(error);
          this.logException(error);
        });
    }

    console.time('years');

    const selectedSubModel = subModelData.filter((bike) => bike.mid === newValue);
    motorcycle = selectedSubModel[0];
    const yearsArr = [];
    createYearsArr(selectedSubModel[0].start_year, selectedSubModel[0].end_year);
    return this.setState({ yearOptions: yearsArr });

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
    if (this.state.backupApi) {
      return this.setState({ yearValue: newValue });
    }
    motorcycle.year = newValue;
    return this.setState({ yearValue: newValue });
  }

  conditionalAsyncErrorMessage() {
    const asyncError = this.state.asyncError;
    const overDistance = this.state.overDistance;
    if (overDistance) {
      return (
        <Message warning>
          <p>Warning: Your motorcycle is currently out of our service area :(</p>
          <p>You may still get and save quotes for now, but we cannot offer any convenience services or guarantee any estimate. </p>
        </Message>
      );
    }
    return null;
  }
  onBlurError() {
    console.log('valid location from suggestselect was not clicked');
    return this.setState({ location: false });
  }

  onSuggestSelect(mapsObj) {
    const coordinatesObj = mapsObj.location;
    const lat = coordinatesObj.lat;
    const lng = coordinatesObj.lng;

    this.props.client.query({
      query: gql`
  query allNearAppointmentsAndSchedules($zipOrCoordinates: String!) {
    allNearAppointmentsAndSchedules(zipOrCoordinates: $zipOrCoordinates){
        schedules {
          id
          day_of_week
          start_time
          end_time
          break_start
          break_end
          available
          fk_mechanic_id
        }
      }
    }
      `,
      variables: { zipOrCoordinates: `${lat}, ${lng}` },
    }).then((response) => {
      const nearMechanics = response.data.allNearAppointmentsAndSchedules.schedules;
      const locationObj = {
        customerLocation: `${lat}, ${lng}`,
      };
      if (nearMechanics.length > 0) {
        this.setState({ overDistance: false });
        return this.setState({ location: locationObj });
      }
      this.setState({ location: locationObj });
      return this.setState({ overDistance: true });
    })
      .catch((e) => this.logException(e));
  }
// TODO: Fix this shit
  validateMotorcycleForm(e) {
    e.preventDefault();
    if (!this.state.location) {
      this.setState({ location: false });
    } /* TODO: remove this for production
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
    let selectedVehicle;
    let vehicle;
    if (this.state.backupApi) {
      console.log('back api being used');
      vehicle = {
        location: this.state.location.customerLocation,
        mid: this.state.subModelValue,
        manufacturer: this.state.manufacturerValue,
        model: this.state.modelValue,
        model_variant: this.state.subModelValue,
        tuning_description: 'mock',
        year: this.state.yearValue,
        start_year: this.state.yearValue,
        end_year: this.state.yearValue,
      };
    } else {
      selectedVehicle = subModelData.filter((submodel) => submodel.mid === this.state.subModelValue);
      vehicle = {
        location: this.state.location.customerLocation,
        mid: this.state.subModelValue,
        manufacturer: selectedVehicle[0].manufacturer,
        model: selectedVehicle[0].model,
        model_variant: selectedVehicle[0].model_variant,
        tuning_description: selectedVehicle[0].tuning_description,
        year: this.state.yearValue,
        start_year: selectedVehicle[0].start_year,
        end_year: selectedVehicle[0].end_year,
      };
    }

// TODO: remove this for production
    const FAKEvehicle = {
      location: this.state.location.customerLocation,
      mid: 'BMM07333',
      manufacturer: 'BMW',
      model: 'F800',
      model_variant: '800 GS',
      year: 2014,
      tuning_description: 'idk',
      start_year: 2013,
      end_year: 2017,
    };
    console.log(vehicle);

    return this.props.onSubmitForm(FAKEvehicle);
  }

  // onblur -> save location to state -> calculate distance from 11435 using distance matrix ->
  // if distance is within x miles -> allow to pass otherwise fail to pass and render message

  logException(ex, context) {
    Raven.captureException(ex, { // eslint-disable-line no-undef
      extra: context,
    });
  /* eslint no-console:0*/
    window.console && console.error && console.error(ex); // eslint-disable-line no-unused-expressions
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
          <div className="ui large icon input">
            <Geosuggest
              placeholder="Enter zipcode or city"
              country="us"
              types={['(regions)']}
              onSuggestSelect={(mapObj) => this.onSuggestSelect(mapObj)}
              onBlur={() => this.onBlurError}
            />
            <i className="location arrow icon"></i>
          </div>
          {this.state.location === false &&
          <Label basic color="red">Please type or select a valid location among the suggestions</Label>
          }
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
              options={this.state.subModelOptions}
              simpleValue
              clearable
              name="selected-submodel"
              value={this.state.subModelValue}
              onChange={this.updateSubModelValueAndGetYears}
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
  onSubmitForm: React.PropTypes.func,
  vehicle: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  vehicle: selectVehicleDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (vehicleObj) => {
      dispatch(addVehicle(vehicleObj));
      browserHistory.push('/quote/services');
    },
  };
}

const QuoteAddVehicleRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  QuoteAddVehicleRedux,
  withApollo,
)(QuoteAddVehicle);
