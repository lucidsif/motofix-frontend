/*
 *
 * SignupPage
 *
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Helmet from 'react-helmet';
import SignupForm from './signupForm';
import { Segment, Message } from 'semantic-ui-react';
import { authenticateUser } from '../App/actions';
//TODO: Make sure signing up gets the token from the response and set it in localstorage (implement in backend first, then here)
export class SignupPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      accountCreated: null,
    };
    this.signUpMutation = this.signUpMutation.bind(this);
  }

  signUpMutation(formMap) {
    /* eslint no-underscore-dangle: ["error", { "allow": ["formMap_", "_root"] }] */
    const email = formMap._root.entries[0][1];
    const password = formMap._root.entries[1][1];
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
      variables: { email, password },
    }).then((response) => {
      console.log(response.data.signUp);
      if (!response.data.signUp) {
        console.log('Account creation failed');
        return this.setState({ accountCreated: false });
      }
      console.log(response)
      this.setState({ accountCreated: true });
      return this.props.onAccountCreation();
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
          <p>User account successfully created! Routing you in just a sec...</p>
        </Message>
      );
    }
    return null;
  }

  render() {
    return (
      <section>
        <div className="container">
          <Helmet
            title="Sign Up Page"
            meta={[
              { name: 'description', content: 'Description of Sign Up Page' },
            ]}
          />
          {this.conditionalaccountCreatedMessage()}
          <Segment padded="very">
            {/* From onSubmit you would be dispatching your action passing in
             the values of the forms. For this dummy example we just
             display the values. */}
            <SignupForm onSubmit={this.signUpMutation} />
          </Segment>
        </div>
      </section>
    );
  }
}


SignupPage.propTypes = {
  client: React.PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    onAccountCreation: (token) => {
      console.log('Account created!');
      // dispatch(authenticateUser());
      // TODO: route to page prior to auth
      return browserHistory.goBack();
    },
  };
}

const SignupPageRedux = connect(null, mapDispatchToProps);

export default compose(
  SignupPageRedux,
  withApollo
)(SignupPage);
