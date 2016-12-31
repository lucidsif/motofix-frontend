import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import Select from 'react-select';
import yearsData from './years';

var yearOptions = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

class QuoteAddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { yearValue: 1990, makeValue: '', modelValue: '' };
    }
    updateYearValue(newValue) {
      console.log(newValue);
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
        <h3>Select a make </h3>
        <Select
          ref="stateSelect"
          autofocus
          options={yearsData}
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

const YEAR_QUERY = gql`
query allMotorcycles($filterByYear: String){
  allMotorcycles(filterByYear: $filterByYear){
    id
    make
  }
}
`;

// Decorate with react-apollo
/*
const withData = graphql(YEAR_QUERY, {
  options: ({ yearValue }) => ({ variables: { filterByYear: yearValue } }),
  props: ({ data: { loading, allMotorcycles } }) => ({
    loading,
    motorcycles: allMotorcycles,
  }),
});

QuoteAddVehicle = withData(QuoteAddVehicle);
*/
export default QuoteAddVehicle;
