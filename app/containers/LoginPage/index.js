/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import LoginForm from './LoginForm'

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
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              {/* From onSubmit you would be dispatching your action passing in
                  the values of the forms. For this dummy example we just
                  display the values. */}
              <LoginForm onSubmit={this.login} locale={this.props.locale} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
