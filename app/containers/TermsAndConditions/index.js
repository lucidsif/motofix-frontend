/*
 *
 * TermsAndConditions
 *
 */

import React from 'react';
import { connect } from 'react-redux';

export class TermsAndConditions extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

export default connect(null, mapDispatchToProps)(TermsAndConditions);
