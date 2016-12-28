import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';

let QuoteAddVehicle = (props) => {
  const { yearValue, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Select Year</label>
          <Field name="year" component="select" className="ui fluid dropdown" placeholder="2017">
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </Field>
        </div>
        <div className="field">
          <label>Select Make</label>
          <Field name="make" component="select" className="ui fluid dropdown" placeholder="BMW">
            <option></option>
          </Field>
          </div>
          <div className="field">
          <label>Select Model</label>
          <Field name="model" component="select" className="ui fluid dropdown" placeholder="HP4">
            <option></option>
          </Field>
          </div>
      <div>
        <button className="ui primary right floated button" type="submit" disabled={pristine || submitting}>Submit</button>
        <button className="right floated button" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
  );
};

// The order of the decoration does not matter.

// Decorate with redux-form
QuoteAddVehicle = reduxForm({
  form: 'selectVehicleForm',  // a unique identifier for this form
})(QuoteAddVehicle);

// Decorate with connect to read form values
const selector = formValueSelector('selectVehicleForm'); // <-- same as form name
QuoteAddVehicle = connect(
  (state) => {
    // can select values individually
    const { yearValue, makeValue, modelValue } = selector(state, 'year', 'make', 'model');
    return {
      yearValue,
      makeValue,
      modelValue,
    };
  }
)(QuoteAddVehicle);

export default QuoteAddVehicle;
