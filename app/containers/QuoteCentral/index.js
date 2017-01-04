/*
 *
 * QuoteCentral
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteCentral from './selectors';
import { Grid, Button } from 'semantic-ui-react';
import QuoteCart from 'components/QuoteCart';
import AddServices from 'components/AddServices';

// TODO: 8/10 Create the price breakdown component
export class QuoteCentral extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <QuoteCart />
        <AddServices />
        <Grid.Row>
          <Button floated="right" color="teal">Next</Button>
          <Button floated="right">Back</Button>
        </Grid.Row>
      </div>
    );
  }
}

const mapStateToProps = selectQuoteCentral();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteCentral);
