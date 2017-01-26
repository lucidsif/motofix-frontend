/*
 *
 * PrivacyPolicy
 *
 */

import React from 'react';
import { connect } from 'react-redux';

export class PrivacyPolicy extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>

      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(PrivacyPolicy);
