import React from 'react';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Helmet from 'react-helmet';
import LoginForm from './LoginForm';
import { Segment, Message } from 'semantic-ui-react';

// TODO: add non null git apassword validation
export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      inAuthenticated: null,
    };
    this.loginMutation = this.loginMutation.bind(this);
  }
  // Display values, which is a Map when using immutables
  login = (values) => alert(`It's a map thanks to immutables with redux-form: ${values}`);

  loginMutation(formMap) {
    const email = formMap._root.entries[0][1];
    const password = formMap._root.entries[1][1];
    // noinspection JSUnresolvedFunction
    return this.props.client.mutate({
      mutation: gql`
      mutation logIn($email: String!, $password: String!){
        logIn(email: $email, password: $password){
          data {
            id
            email
          }
      }
    }
    `,
      variables: { email, password },
    }).then((response) => {
      console.log(response.data.logIn);
      if (!response.data.logIn) {
        console.log('inauthenticated');
        return this.setState({ inAuthenticated: true });
      }
      console.log('authenticated');
      return this.setState({ inAuthenticated: false });
    });
  }

  conditionalInauthenticatedMessage() {
    const inAuthenticated = this.state.inAuthenticated;
    if (inAuthenticated) {
      return (
        <Message negative>
          <p>Incorrect user credentials :(</p>
          <p>Please try again</p>
        </Message>
      );
    }
    if (inAuthenticated === false) {
      return (
        <Message positive>
          <p>Success: You have been logged in!</p>
          <p>Routing you in just a sec...</p>
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
            title="LoginPage"
            meta={[
              { name: 'description', content: 'Description of LoginPage' },
            ]}
          />
          {this.conditionalInauthenticatedMessage()}
          <Segment padded="very">
            {/* From onSubmit you would be dispatching your action passing in
              the values of the forms. For this dummy example we just
              display the values. */}
            <LoginForm onSubmit={this.loginMutation} />
          </Segment>
        </div>
      </section>
    );
  }
}

LoginPage.propTypes = {
  client: React.PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const LoginPageRedux = connect(null, mapDispatchToProps);

export default compose(
  LoginPageRedux,
  withApollo,
)(LoginPage);
