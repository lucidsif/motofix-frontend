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

        <Grid.Row>
          <Segment padded="very">
            <Grid centered divided="vertically">
              <Grid.Row>
                <p>Total: $80.00</p>
              </Grid.Row>

              <Grid.Row columns={2} divided>
                <Grid.Column>
                  <p>Saved: $15.00</p>
                </Grid.Column>
                <Grid.Column>
                  <p>Dealer Price: $65.00</p>
                </Grid.Column>
              </Grid.Row>

            </Grid>
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
