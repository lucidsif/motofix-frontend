/**
*
* FormModal
*
*/

import React from 'react';
import { Button, Modal, Header, Icon, Form } from 'semantic-ui-react';




class FormModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = { email: null, modalOpen: false };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`mock submit, email to be send is ${this.state.email}`);
  }

  handleOpen(e){
    this.setState({ modalOpen: true });
  }

  handleClose(e) {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Send to Email</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='mail outline' content='What email should we send your quote to?' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input type='email' placeholder="email address" icon="mail outline" iconPosition="left" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted floated="right" onClick={this.handleSubmit}>
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
