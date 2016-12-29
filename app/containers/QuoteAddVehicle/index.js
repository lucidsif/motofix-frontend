import React from 'react';
import ApolloClient from 'apollo-client';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, propTypes } from 'redux-form/immutable';
import yearsData from './years';

let QuoteAddVehicle = (props) => {
  // some of the props are generated by redux-form to give to the decorated form component
  const { yearValue, makeValue, modelValue, handleSubmit, pristine, reset, submitting, motorcycles, loading, client } = props;
  const yearsOptions = yearsData.map(
      (year) => <option key={year} value={year}>{year}</option>);
  const withData = {
         options: ({ yearValue }) => ({ variables: { filterByYear: yearValue } }),
        props: ({ data: { loading, allMotorcycles } }) => ({
          loading,
          motorcycles: allMotorcycles,
        }),
      };

  const yearFilterQuery = (e) => {
    client.query({
      query: gql`
      query allMotorcycles($filterByYear: String){
        allMotorcycles(filterByYear: $filterByYear){
          id
          make
        }
      }
      `,
      variables: { filterByYear: yearValue },
    });
    console.log(motorcycles);
  };

  if(loading){
    return <div>loading</div>
  }
  return (
    <form className="ui form" onSubmit={handleSubmit}>
    <h4>{yearValue}</h4>
      <div className="field">
          <label>Select Year</label>
        <Field name="year" component="select" onClick={yearFilterQuery} className="ui fluid dropdown" placeholder="2017">
          {yearsOptions}
        </Field>
      </div>
      <div className="field">
        <label>Select Make</label>
        <Field name="make" component="select" className="ui fluid dropdown" placeholder="BMW">
          <option></option>
          <option>BMW</option>
        </Field>
      </div>
      <div className="field">
        <label>Select Model</label>
        <Field name="model" component="select" className="ui fluid dropdown" placeholder="HP4">
          <option></option>
          <option>HP4</option>
        </Field>
      </div>
      <div>
        <button className="ui primary right floated button" type="Submit" disabled={pristine || submitting}>Next</button>
        <button className="right floated button" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
  );
};

QuoteAddVehicle.propTypes = {
  ...propTypes,
  client: React.PropTypes.instanceOf(ApolloClient).isRequired,
};

// Decorate with connect to read form values
const selector = formValueSelector('selectVehicleForm');
QuoteAddVehicle = connect(
  (state) => {
    // can select values individually
    const yearValue = selector(state, 'year');
    const makeValue = selector(state, 'make');
    const modelValue = selector(state, 'model');
    return {
      yearValue,
      makeValue,
      modelValue,
    };
  }
)(QuoteAddVehicle);

// Decorate with redux-form
QuoteAddVehicle = reduxForm({
  form: 'selectVehicleForm',  // a unique identifier for this form
})(QuoteAddVehicle);

QuoteAddVehicle = withApollo(QuoteAddVehicle);

export default QuoteAddVehicle;
