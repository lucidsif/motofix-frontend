/*
 *
 * QuoteAddVehicle
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteAddVehicle from './selectors';
import { Button, Form, Message } from 'semantic-ui-react';

const genders = [
  { text: 'Male', value: 'male' },
  { text: 'Female', value: 'female' },
];

export class QuoteAddVehicle extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = { formData: {} };
  }

  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit = (e, { formData }) => {
    e.preventDefault();
    this.setState({ formData });
  }
  render() {
    const { formData } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Select label="Gender" name="gender" options={genders} placeholder="Gender" />
        </Form.Group>
        <Form.Group widths="2">
        </Form.Group>
        <Button primary type="submit">Submit</Button>

        <Message>
          <pre>formData: {JSON.stringify(formData, null, 2)}</pre>
        </Message>
      </Form>
    );
  }
}

const mapStateToProps = selectQuoteAddVehicle();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteAddVehicle);
