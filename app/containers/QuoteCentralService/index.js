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
              <p className="totalPriceNum">Your Total Price: </p>
            </Grid.Row>
            <Grid centered divided="vertically">
              <Grid.Row>
                <Label color="teal" size="big">$70.00</Label>
              </Grid.Row>

              <Grid.Row columns={2} divided>
                <Grid.Column>
                  <p>Dealer Price:</p>
                  <Label color="red" size="large">~$110</Label>
                </Grid.Column>
                <Grid.Column>
                  <p>Total Savings:</p>
                  <Label color="teal" size="large">~$40 (36%)</Label>
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
