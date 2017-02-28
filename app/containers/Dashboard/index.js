/*
 *
 * Dashboard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthenticated } from 'containers/App/selectors';
import { Grid, Segment, Header, Image, Message } from 'semantic-ui-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Appointments from 'components/Appointments';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';


const UserIsAuthenticated = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: (state) => state.get('global').toJS(),
  predicate: (state) => state.authenticated,
  redirectAction: routerActions.push,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props.allUserAppointments);
    return (
      <Grid centered>

        <Segment attached="top" textAlign="center" className="dashboard">
          <Grid stackable>
            <Grid.Row>
              <Grid.Column>
                <Header as="h2">
                  <Image shape="circular" src="http://semantic-ui.com/images/avatar2/large/patrick.png" />
                  {' '}Hello, Tawsif
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
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
          <Tabs
            onSelect={this.handleSelect}
            selectedIndex={2}
          >

            {/*
             <TabList/> is a composite component and is the container for the <Tab/>s.
             */}

            <TabList>

              {/*
               <Tab/> is the actual tab component that users will interact with.

               Selecting a tab can be done by either clicking with the mouse,
               or by using the keyboard tab to give focus then navigating with
               the arrow keys (right/down to select tab to the right of selected,
               left/up to select tab to the left of selected).

               The content of the <Tab/> (this.props.children) will be shown as the label.
               */}

              <Tab>Appointments</Tab>
              <Tab>My Motorcycles</Tab>
            </TabList>

            {/*
             <TabPanel/> is the content for the tab.

             There should be an equal number of <Tab/> and <TabPanel/> components.
             <Tab/> and <TabPanel/> components are tied together by the order in
             which they appear. The first (index 0) <Tab/> will be associated with
             the <TabPanel/> of the same index. When you run this example with
             `selectedIndex` equal to 0, the tab with the label "Foo" will be selected
             and the content shown will be "Hello from Foo".

             As with <Tab/> the content of <TabPanel/> will be shown as the content.
             */}

            <TabPanel>
              <Appointments allUserAppointments={this.props.allUserAppointments} />
            </TabPanel>
            <TabPanel>
              <h2>Coming Soon</h2>
            </TabPanel>
          </Tabs>
        </Segment>

      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const appointmentsQuery = gql`
  query allUserAppointments($fk_user_id: Int!) {
    allUserAppointments(fk_user_id: $fk_user_id){
      id
      motorcycle_address
      estimated_start_time
      estimated_end_time
      status
      fk_quote_id
      fk_mechanic_id
      fk_user_id
    }
  }
`;

const DashboardRedux = connect(mapStateToProps, mapDispatchToProps);

// how do I get user id from the props?
const withAppointmentsData = graphql(appointmentsQuery, {
  options: {
    variables: { fk_user_id: parseInt(localStorage.getItem('userID'), 10) },
    forceFetch: true,
  },
  props: ({ ownProps, data: { loading, allUserAppointments } }) => ({
    allUserAppointmentsLoading: loading,
    allUserAppointments,
    ownProps,
  }),
});

export default compose(
  DashboardRedux,
  UserIsAuthenticated,
  withAppointmentsData
)(Dashboard);
