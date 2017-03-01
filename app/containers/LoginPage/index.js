import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Helmet from 'react-helmet';
import LoginForm from './LoginForm';
import { Segment, Message } from 'semantic-ui-react';
import { authenticateUser, setUserId } from '../App/actions';
// set and get userid with localstorage
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
    /* eslint no-underscore-dangle: ["error", { "allow": ["formMap_", "_root"] }] */
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
          token
      }
    }
    `,
      variables: { email, password },
    }).then((response) => {
      if (!response.data.logIn) {
        console.log('inauthenticated');
        return this.setState({ inAuthenticated: true });
      }
      console.log('authenticated');
      localStorage.setItem('authToken', response.data.logIn.token);
      this.setState({ inAuthenticated: false });
      this.props.onAuthentication(parseInt(response.data.logIn.data.id, 10));
      return browserHistory.goBack();
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
  onAuthentication: React.PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    onAuthentication: (userId) => {
      dispatch(setUserId(userId));
      dispatch(authenticateUser());
    },
  };
}

const LoginPageRedux = connect(null, mapDispatchToProps);

export default compose(
  LoginPageRedux,
  withApollo,
)(LoginPage);
