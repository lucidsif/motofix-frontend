/*
 *
 * SavedQuotes
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectAuthenticated } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';

import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

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
    console.log(this.props);
    return (
      <div>
        secret message
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated(),
});

const SavedQuotesConnect = connect(mapStateToProps, null)(SavedQuotes);

export default UserIsAuthenticated(SavedQuotesConnect); // eslint-disable-line new-cap

/*
export default UserIsAuthenticated(connect(createSelector(
  selectAuthenticated(),
  (authenticated) => ({ authenticated })
), null)(SavedQuotes));
*/
