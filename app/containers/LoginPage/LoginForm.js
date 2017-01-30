import React from 'react';
// Notice that we need redux-form/immutable for the boilerplate
// http://redux-form.com/6.2.0/examples/immutable/
import { Field, reduxForm } from 'redux-form/immutable';
import { Form, Button, Header } from 'semantic-ui-react';

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
    </Form>
  );
};

export default reduxForm({
  // Per Step# 2: http://redux-form.com/6.2.0/docs/GettingStarted.md/
  // A unique identifier for this form
  form: 'loginForm',
})(LoginForm);

