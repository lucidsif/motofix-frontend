/*
 *
 * QuoteCentralService
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteCentralService from './selectors';
import { Grid, Button } from 'semantic-ui-react';
import QuoteCart from 'components/QuoteCart';
import ServiceCentral from 'components/ServiceCentral';

// TODO: 8/10 Create the price breakdown component
export class QuoteCentralService extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <QuoteCart />
        <ServiceCentral />
        <Grid.Row>
          <Button floated="right" color="teal">Next</Button>
          <Button floated="right">Back</Button>
        </Grid.Row>
      </div>
    );
  }
}

const mapStateToProps = selectQuoteCentralService();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteCentralService);
