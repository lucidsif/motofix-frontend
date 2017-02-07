/**
*
* FormModal
*
*/

import React from 'react';
import { Button, Modal, Header, Icon, Form, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';

// TODO: Add validation messages
// TODO: Log in user by dispatching the login action and setting the token after a successful signup.

// TODO: Send a signup mutation onsubmit
// TODO: Create a success and error message - Need to share state with redux or have component CoLocate with parent
/** @namespace React.Component */
class FormModal extends React.Component { // EsLint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      modalOpen: false,
      accountCreated: null,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.conditionalaccountCreatedMessage = this.conditionalaccountCreatedMessage.bind(this);
  }

  handleEmailChange(e) {
    // noinspection JSUnresolvedFunction
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    // noinspection JSUnresolvedFunction
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validated = this.validateEmail(this.state.email);
    const pass = this.state.password;
    if (!validated) {
      console.log(`email: ${this.state.email}, is not valid`);
      return;
    }
    if (!pass) {
      console.log(`password: ${this.state.password}, is not valid`);
      return;
    }
    if (validated && pass) {
      console.log(`email and pass is validated, submitting email: ${this.state.email}, pass: ${this.state.password}`);
      this.signUpMutation();
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

  signUpMutation() {
    console.log(this.props.client);
    // noinspection JSUnresolvedFunction
    return this.props.client.mutate({
      mutation: gql`
      mutation signUp($email: String!, $password: String!){
        signUp(email: $email, password: $password){
          id
          email
      }
    }
    `,
      variables: { email: this.state.email, password: this.state.password },
    }).then((response) => {
      if (!response.data.signUp) {
        return this.setState({ accountCreated: false });
      }
      return this.setState({ accountCreated: true });
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
        trigger={<Button color="orange" circular size="huge" onClick={this.handleOpen}>Get $15 off</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size="small"
        closeIcon="close"
      >
        <Header icon="mail outline" content="Sign up to get full access to your free app and get $15 off your next service on motofix! " />
        {this.conditionalaccountCreatedMessage()}
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              onChange={this.handleEmailChange}
              type="email"
              placeholder="email address"
              icon="mail outline"
              iconPosition="left"
            />
            <Form.Input
              onChange={this.handlePasswordChange}
              type="password"
              placeholder="password"
              icon="lock"
              iconPosition="left"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" color="green" inverted floated="right" onClick={this.handleSubmit}>
            <Icon name="checkmark" /> Get $15 off
          </Button>
          <Button basic color="red" inverted floated="right" onClick={this.handleClose}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

FormModal.propTypes = {
  client: React.PropTypes.object,
};

export default FormModal;
