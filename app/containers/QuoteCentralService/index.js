/*
 *
 * QuoteCentralService
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectQuoteCentralService from './selectors';
import { Grid, Segment, Accordion, Icon, Button, Label } from 'semantic-ui-react';
import ServiceCentral from 'components/ServiceCentral';

// TODO: 5/10 modularize by creating a separate component for the quotecart
// TODO: 8/10 Create the price breakdown component
export class QuoteCentralService extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>

        <Grid.Row>
          <Segment padded="very">
            <Grid.Row>
              <p>Your Total Price: </p>
            </Grid.Row>
            <Grid centered divided="vertically">
              <Grid.Row>
                <Label>$80.00</Label>
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
