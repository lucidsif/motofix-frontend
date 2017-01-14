/**
*
* FormModal
*
*/

import React from 'react';
import { Button, Modal, Header, Icon, Input, Form } from 'semantic-ui-react';




class FormModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = { email: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`mock submit, email to be send is ${this.state.email}`);
  }

  render() {
    return (
      <Modal trigger={<Button>Send to Email</Button>} basic size='small'>
        <Header icon='mail outline' content='What email should we send your quote to?' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input type='password' placeholder="email address" icon="mail outline" iconPosition="left" />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted floated="right" onClick={this.handleSubmit}>
            <Icon name='checkmark' /> Send
          </Button>
          <Button basic color='red' inverted floated="right">
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FormModal;
