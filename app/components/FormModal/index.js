/**
*
* FormModal
*
*/

import React from 'react';
import { Button, Modal, Header, Icon, Form, Message } from 'semantic-ui-react';

// TODO: Send a signup mutation onsubmit
// TODO: Create a success and error message - Need to share state with redux or have component colocate with parent
class FormModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = { email: null, password: null, modalOpen: false };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleEmailChange(e){
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e){
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const validated = this.validateEmail(this.state.email);
    const pass = this.state.password;
    if(!validated){
      console.log(`email: ${this.state.email}, is not valid`)
    }
    if(!pass){
      console.log(`password: ${this.state.password}, is not valid`)
    }
    if(validated && pass) {
      console.log(`email and pass is validated, submitting email: ${this.state.email}, pass: ${this.state.password}`);
      return this.handleClose();
    }
  }

  handleOpen(e){
    this.setState({ modalOpen: true });
  }

  handleClose(e) {
    this.setState({ modalOpen: false });
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <Modal
        trigger={<Button color="blue" onClick={this.handleOpen}>Get $15 off</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='mail outline' content="Sign up to get full access to your free app and get $15 off your next service on motofix! " />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              onChange={this.handleEmailChange}
              type='email'
              placeholder="email address"
              icon="mail outline"
              iconPosition="left"
            />
            <Form.Input
              onChange={this.handlePasswordChange}
              type='password'
              placeholder="password"
              icon="lock"
              iconPosition="left"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type='submit' color='green' inverted floated="right" onClick={this.handleSubmit}>
            <Icon name='checkmark' /> Get $15 off
          </Button>
          <Button basic color='red' inverted floated="right" onClick={this.handleClose}>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FormModal;
