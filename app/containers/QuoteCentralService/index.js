/*
 *
 * QuoteCentralService
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteCentralService from './selectors';
import { Grid, Segment, Accordion, Icon, Button } from 'semantic-ui-react';
import ServiceCentral from 'components/ServiceCentral';

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

              <Accordion>
                <Accordion.Title>
                  <Icon name="dropdown" />
                    See cost breakdown
                </Accordion.Title>
                <Accordion.Content>
                  <p>
                    Price breakdown component goes here
                  </p>
                </Accordion.Content>
              </Accordion>

            </Grid>
          </Segment>
        </Grid.Row>

        < ServiceCentral />

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
