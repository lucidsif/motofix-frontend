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
    displayName: 'CitiesField'
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }
    updateValue(newValue) {
      console.log(newValue);
        this.setState({ value: newValue });
      }

    render() {
      return (
        <div>
        <h3>Select a year </h3>
        <Select
          ref="stateSelect"
          autofocus
          options={yearsData}
          simpleValue
          clearable
          name="selected-year"
          value={this.state.value}
          onChange={this.updateValue.bind(this)}
          searchable={this.state.searchable}
          placeholder="1990"
        />
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
