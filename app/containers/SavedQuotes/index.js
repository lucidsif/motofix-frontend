/*
 *
 * SavedQuotes
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectAuthenticated } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';


// TODO: Require authentication to see this page. redirect to login if inauthenticated
// TODO: Wrap container with graphql, fetch quotes on mount, and map the quotes.

const UserIsAuthenticated = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: (state) => state.get('global').toJS(),
  predicate: (state) => state.authenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export class SavedQuotes extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const loadingMessage = 'Loading your saved quotes...';
    console.log(this.props);
    if (this.props.allUserQuotesLoading) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted content={loadingMessage} />
          </Dimmer>
          <Image src="http://semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    }
    return (
      <div>
        secret message
      </div>
    );
  }
}

SavedQuotes.propTypes = {
  allUserQuotesLoading: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
});

const CurrentUserQuotesQuery = gql`
query allUserQuotes($token: String){
  allUserQuotes(token: $token){
    id
    fk_users_id
    motorcycle_json
    cart_json
    part_json
    createdAt
    updatedAt
  }
}
`;

const SavedQuotesConnect = connect(mapStateToProps, null);

const withSavedQuotesData = graphql(CurrentUserQuotesQuery, {
  options: { variables: { token: localStorage.getItem('authToken') } },
  props: ({ ownProps, data: { loading, allUserQuotes } }) => ({
    allUserQuotesLoading: loading,
    allUserQuotes,
    ownProps,
  }),
});

export default compose(
  SavedQuotesConnect,
  UserIsAuthenticated,
  withSavedQuotesData,
)(SavedQuotes);
