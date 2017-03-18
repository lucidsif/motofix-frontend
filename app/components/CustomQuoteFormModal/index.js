/**
*
* CustomQuoteCustomQuoteFormModal
*
*/

import React from 'react';
import { Button, Modal, Header, Icon, Form, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';


class CustomQuoteFormModal extends React.Component { // EsLint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      services: null,
      notes: null,
      modalOpen: false,
      accountCreated: null,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleServicesChange = this.handleServicesChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.conditionalaccountCreatedMessage = this.conditionalaccountCreatedMessage.bind(this);
  }

  handleEmailChange(e) {
    // noinspection JSUnresolvedFunction
    this.setState({ email: e.target.value });
  }

  handleServicesChange(e) {
    // noinspection JSUnresolvedFunction
    this.setState({ services: e.target.value });
  }

  handleNotesChange(e) {
    // noinspection JSUnresolvedFunction
    this.setState({ notes: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validated = this.validateEmail(this.state.email);
    const services = this.state.services;
    if (!validated) {
      console.log(`email: ${this.state.email}, is not valid`);
      return;
    }
    if (!services) {
      console.log(`services: ${this.state.services}, is not valid`);
      return;
    }
    if (validated && services) {
      console.log(`email and services is validated, submitting email: ${this.state.email}, services: ${this.state.services}`);
      this.createQuoteMutation();
    }
  }

  handleOpen(e) {
    // noinspection JSUnresolvedFunction
    this.setState({ modalOpen: true });
    return e;
  }

  handleClose(e) {
    // noinspection JSUnresolvedFunction
    this.setState({ modalOpen: false });
    return e;
  }

  validateEmail(email) {
    // noinspection JSUnresolvedFunction
    // const re = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    const sanitizePattern = new RegExp('[^@]+@[^@]+\\.[^@]+');
    return sanitizePattern.test(email);
  }

  createQuoteMutation() {
    // noinspection JSUnresolvedFunction
    return this.props.client.mutate({
      mutation: gql`
      mutation createCustomQuote($motorcycle: String!, $location: String!, $services: String!, $notes: String, $email: String!, $completed: Boolean!){
    createCustomQuote(motorcycle: $motorcycle, location: $location, services: $services, notes: $notes, email: $email, completed: $completed) {
      id
      email
      motorcycle
      location
      services
      notes
      completed
     }
  }
    `,
      variables: {
        motorcycle: `${this.props.vehicle.year} ${this.props.vehicle.manufacturer} ${this.props.vehicle.model} ${this.props.vehicle.model_variant}`, // redux state
        location: this.props.vehicle.location, // redux state
        services: this.state.services, //
        notes: this.state.notes,
        email: this.state.email,
        completed: false,
      },
    }).then((response) => {
      console.log(response);
    });
  }

  conditionalaccountCreatedMessage() {
    const accountCreated = this.state.accountCreated;
    if (accountCreated === false) {
      return (
        <Message negative>
          <p>A user account with that email already exists :(</p>
          <p>Please use another email or log in</p>
        </Message>
      );
    }
    if (accountCreated === true) {
      return (
        <Message positive>
          <p>Thank you for signing up! We will send you a confirmation email for your $15 off coupon.</p>
          <p>Feel free to explore the rest of our app. It is designed to achieve maximal rider happiness in the context of motorcycle maintenance and it only gets better here on!</p>
        </Message>
      );
    }
    return null;
  }

  render() {
    return (
      <Modal
        trigger={
          <Button
            onClick={this.handleOpen}

          >
            {"Can't"} find the service you need?
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
        closeIcon="close"
      >
        <Header icon="mail outline" content="Get a free custom quote to your email " />
        {this.conditionalaccountCreatedMessage()}
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              onChange={this.handleServicesChange}
              type="text"
              placeholder="What services do you need?"
              icon="wrench"
              iconPosition="left"
            />
            <Form.Input
              onChange={this.handleNotesChange}
              type="text"
              placeholder="Add any optional notes here."
              icon="sticky note"
              iconPosition="left"
            />
            <Form.Input
              onChange={this.handleEmailChange}
              type="email"
              placeholder="What email should we send your quote to? We promise no spam."
              icon="mail outline"
              iconPosition="left"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" color="green" inverted floated="right" onClick={this.handleSubmit}>
            <Icon name="checkmark" /> Get Custom Quote
          </Button>
          <Button basic color="red" inverted floated="right" onClick={this.handleClose}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

CustomQuoteFormModal.propTypes = {
  client: React.PropTypes.object,
  vehicle: React.PropTypes.object,
};

export default CustomQuoteFormModal;
