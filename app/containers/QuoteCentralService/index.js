/*
 *
 * QuoteCentralService
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteCentralService from './selectors';
import { Grid, Segment } from 'semantic-ui-react';

export class QuoteCentralService extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
    <Grid.Row stretched>
    <Segment padded="very">
      <p>Live cart</p>
      </Segment>
    </Grid.Row>
    <Grid.Row>
    <Segment padded="very">
      Services
      </Segment>
    </Grid.Row>
    <Grid.Row>
    <Segment padded="very" attached="bottom">
      Input search box
      </Segment>
    </Grid.Row>
    <Grid.Row>
    <p>2 buttons</p>
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
