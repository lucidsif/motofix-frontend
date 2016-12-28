/*
 *
 * QuoteContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteContainer from './selectors';
import { Segment } from 'semantic-ui-react';
import QuoteProgressBar from 'components/QuoteProgressBar';

export class QuoteContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <QuoteProgressBar />
        <Segment attached padded="very"> Very padded content.
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = selectQuoteContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteContainer);
