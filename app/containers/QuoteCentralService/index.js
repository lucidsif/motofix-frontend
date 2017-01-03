/*
 *
 * QuoteCentralService
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteCentralService from './selectors';
import { Grid, Image } from 'semantic-ui-react';

export class QuoteCentralService extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
    <Grid.Row>
      Live cart
    </Grid.Row>
    <Grid.Row>
      Services
    </Grid.Row>
    <Grid.Row>
      Input search box
    </Grid.Row>
    <Grid.Row>
    2 buttons
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
