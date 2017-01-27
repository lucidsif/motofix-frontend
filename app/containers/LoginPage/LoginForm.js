import React from 'react';
// Notice that we need redux-form/immutable for the boilerplate
// http://redux-form.com/6.2.0/examples/immutable/
import { Field, reduxForm } from 'redux-form/immutable';
// import { FormattedMessage } from 'react-intl';

const renderField = ({ input, type, meta: { touched, error } }) => (
  <div>
    <input {...input} className="form-control" type={type} />
    {touched && error && <span>{error}</span>}
  </div>
);
/*
const renderGroup = (field) => (
  <div className="form-group">
    <label><FormattedMessage {...messages[field]} /></label>
    <Field name={field} type={field} component={renderField} />
  </div>
);
*/
const LoginForm = (props) => {
  const { error, handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Field name="email" type="email" component={renderField} />
      </div>

      <div className="form-group">
        <Field name="password" type="password" component={renderField} label="Password" />
      </div>

      {/* Render error if any. */}
      {error && <strong>{error}</strong>}

      <div>
        <button type="submit" className="btn btn-primary" disabled={submitting}></button>
      </div>
    </form>
  );
};

renderField.propTypes = {
  input: React.PropTypes.object,
  meta: React.PropTypes.object,
  type: React.PropTypes.object,
};

LoginForm.propTypes = {
  error: React.PropTypes.string,
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.object,
};

export default reduxForm({
  // Per Step# 2: http://redux-form.com/6.2.0/docs/GettingStarted.md/
  // A unique identifier for this form
  form: 'loginForm',
})(LoginForm);
