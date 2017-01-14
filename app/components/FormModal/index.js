/**
*
* FormModal
*
*/

import React from 'react';
import { Button, Modal, Header, Icon, Form, Message } from 'semantic-ui-react';

// TODO: Create a success and error message - Need to share state with redux or have component colocate with parent
class FormModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = { email: null, modalOpen: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e){
    this.state = { email: e.target.value };
  }

  handleSubmit(e) {
    e.preventDefault();
    let validated = this.validateEmail(this.state.email);
    if(validated){
      console.log(`validated internally, submitting email: ${this.state.email}`);
      return this.handleClose();
    }
    else{
      console.log(`invalidated internally: ${this.state.email}`)
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
        trigger={<Button color="blue" onClick={this.handleOpen}>Send to Email</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='mail outline' content='What email should we send your quote to?' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              onChange={this.handleChange}
              type='email'
              placeholder="email address"
              icon="mail outline"
              iconPosition="left"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type='submit' color='green' inverted floated="right" onClick={this.handleSubmit}>
            <Icon name='checkmark' /> Send
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
