/*
 *
 * QuoteAppointmentScheduler
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteAppointmentScheduler from './selectors';

export class QuoteAppointmentScheduler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        calendar here
      </div>
    );
  }
}

const mapStateToProps = selectQuoteAppointmentScheduler();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteAppointmentScheduler);
