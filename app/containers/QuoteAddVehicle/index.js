import React from 'react';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Message, Label } from 'semantic-ui-react';
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
let motorcycle;

// TODO: 7.1/10 add form validation
// TODO: 7/10 half the size of the select menus
// TODO: 6.5/10 refactor to use official api for select menus when available or write in more declarative way
// TODO: 6/10 replace spans with labels
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
      yearOptions: null,
      asyncError: false,
    };

    this.updateManufacturerValueAndGetModels = this.updateManufacturerValueAndGetModels.bind(this);
    this.updateModelValueAndGetSubModels = this.updateModelValueAndGetSubModels.bind(this);
    this.updateSubModelValueAndRenderYears = this.updateSubModelValueAndRenderYears.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.conditionalAsyncErrorMessage = this.conditionalAsyncErrorMessage.bind(this);
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
          <p>We have a limited # of API calls to our data provider until they upgrade us. Please try again after 8PM.</p>
        </Message>
      );
    }
    return null;
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
        <form onSubmit={this.props.onSubmitForm}>
          {this.conditionalAsyncErrorMessage()}
          <h3 className="section-heading">Add your motorcycle</h3>
          <div>
            <span>Select a make</span>
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
            <span>Select a model </span>
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
            <span>Select a sub-model </span>
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
            <span>Select a year </span>
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
    onSubmitForm: (evt) => {
      evt.preventDefault();
      if (motorcycle) {
        console.log('all fields submitted');
        dispatch(addVehicle(motorcycle));
        browserHistory.push('/quote/services');
      } else {
        console.log('please fill out all fields');
      }
    },
  };
}

const QuoteAddVehicleRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  QuoteAddVehicleRedux,
  withApollo,
)(QuoteAddVehicle);
