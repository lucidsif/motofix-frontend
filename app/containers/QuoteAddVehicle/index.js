import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';

let QuoteAddVehicle = (props) => {
  const { favoriteColorValue, fullName, handleSubmit, hasEmailValue, pristine, reset, submitting } = props;
  return (
    <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Select Year</label>
          <Field name="favoriteColor" component="select" className="ui fluid dropdown" placeholder="2017">
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
          </Field>
        </div>
        <div className="field">
          <label>Select Make</label>
          <Field name="make" component="select" className="ui fluid dropdown" placeholder="BMW">
            <option></option>
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
          </Field>
          </div>
          <div className="field">
          <label>Select Model</label>
          <Field name="model" component="select" className="ui fluid dropdown" placeholder="HP4">
            <option></option>
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
          </Field>
          </div>
      <div>
        <button className="ui primary button" type="submit" disabled={pristine || submitting}>Submit {fullName}</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
  );
};

// The order of the decoration does not matter.

// Decorate with redux-form
QuoteAddVehicle = reduxForm({
  form: 'selectingFormValues',  // a unique identifier for this form
})(QuoteAddVehicle);

// Decorate with connect to read form values
const selector = formValueSelector('selectingFormValues'); // <-- same as form name
QuoteAddVehicle = connect(
  (state) => {
    // can select values individually

    const favoriteColorValue = selector(state, 'favoriteColor');
    return {
      favoriteColorValue,
    };
  }
)(QuoteAddVehicle);

export default QuoteAddVehicle;
