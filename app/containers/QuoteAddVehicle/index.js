/*
 *
 * QuoteAddVehicle
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteAddVehicle from './selectors';
import { Button, Form, Message } from 'semantic-ui-react';

const years = [
  { text: 2017, value: 2017 },
  { text: 2016, value: 2016 },
  { text: 2015, value: 2015 },
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
        <h3>Add your motorcycle</h3>
        <Form.Group widths="equal">
          <Form.Select label="Year" name="year" options={years} placeholder="2017" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select label="Make" name="make" options={years} placeholder="Honda" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select label="Model" name="model" options={years} placeholder="CBR 600" />
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
