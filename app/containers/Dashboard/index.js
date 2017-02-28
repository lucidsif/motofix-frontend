/*
 *
 * Dashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectDashboard from './selectors';
import { Grid, Segment, Header, Card, Button, Image, Message, Label } from 'semantic-ui-react';

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Grid centered>

        <Segment attached="top" textAlign="center" className="dashboard">
          <Grid stackable centered >
            <Grid.Row>
              <Grid.Column>
                <Header as="h2">
                  <Image shape="circular" src="http://semantic-ui.com/images/avatar2/large/patrick.png" />
                  {' '}Hello, Tawsif
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Message
                  color="teal"
                  icon="money"
                  header="Get $10, Give $10"
                  content="For every rider you refer who orders a service, both of you will get $10."
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2} centered className="forceCenterAlign">
              <Grid.Column>
                <Message
                  icon="wrench"
                  header="Recommendations: 0"
                />
              </Grid.Column>
              <Grid.Column>
                <Message
                  icon="calendar"
                  header="Upcoming Services: 0"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment attached="bottom" textAlign="center">

        </Segment>

      </Grid>
    );
  }
}

const mapStateToProps = selectDashboard();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
