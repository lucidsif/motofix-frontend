import React from 'react';
import { connect } from 'react-redux';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Helmet from 'react-helmet';
import LoginForm from './LoginForm';
import { Segment } from 'semantic-ui-react';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  // Display values, which is a Map when using immutables
  login = (values) => alert(`It's a map thanks to immutables with redux-form: ${values}`);

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
          <Segment padded="very">
            {/* From onSubmit you would be dispatching your action passing in
              the values of the forms. For this dummy example we just
              display the values. */}
            <LoginForm onSubmit={this.login} />
          </Segment>
        </div>
      </section>
    );
  }
}

LoginPage.propTypes = {
  client: React.PropTypes.object,
  onSubmitForm: React.PropTypes.func,
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
