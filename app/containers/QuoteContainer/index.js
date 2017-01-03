/*
 *
 * QuoteContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteContainer from './selectors';
import { Grid } from 'semantic-ui-react';
import QuoteProgressBar from 'components/QuoteProgressBar';

export class QuoteContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Grid centered divided="vertically">
        <Grid.Row> <QuoteProgressBar /> </Grid.Row>
                {this.props.children} 
      </Grid>
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
