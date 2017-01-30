import React from 'react';
// Notice that we need redux-form/immutable for the boilerplate
// http://redux-form.com/6.2.0/examples/immutable/
import { Field, reduxForm } from 'redux-form/immutable';
import { Form, Button, Header } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

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
)
*/
const LoginForm = (props) => {
  const { error, handleSubmit, submitting } = props;
  function routeToSignUp(evt) {
    evt.preventDefault();
    browserHistory.push('/signup');
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h2" textAlign="center"> Log In </Header>
      <Form.Field>
        <label>Email</label>
        <Field name="email" type="email" component={renderField} />
      </Form.Field>

      <Form.Field>
        <label>Password</label>
        <Field name="password" type="password" component={renderField} label="Password" />
      </Form.Field>

      {/* Render error if any. */}
      {error && <strong>{error}</strong>}

      <Button circular primary disabled={submitting} floated="right">Log In</Button>
      <Button onClick={(evt) => routeToSignUp(evt)} hidden floated="right">No Account?</Button>
    </Form>
  );
};

renderField.propTypes = {
  input: React.PropTypes.object,
  type: React.PropTypes.string,
  meta: React.PropTypes.object,
};

LoginForm.propTypes = {
  error: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
};

export default reduxForm({
  // Per Step# 2: http://redux-form.com/6.2.0/docs/GettingStarted.md/
  // A unique identifier for this form
  form: 'loginForm',
})(LoginForm);

