/*
 *
 * SavedQuotes
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectAuthenticated } from 'containers/App/selectors';
import { createSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

// TODO: Require authentication to see this page. redirect to login if inauthenticated
// TODO: Wrap container with graphql, fetch quotes on mount, and map the quotes.

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.get('global').toJS(),
  predicate: state => state.authenticated,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export class SavedQuotes extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const authenticated = this.props.authenticated;
    console.log(this.props);
    return (
      <div>
        secret message
      </div>
    );
  }
}

SavedQuotes.propTypes = {
  authenticated: React.PropTypes.bool,
  authData: React.PropTypes.object,
};

//export default connect(mapStateToProps, null)(SavedQuotes);

export default UserIsAuthenticated(connect(createSelector(
  selectAuthenticated(),
  (authenticated) => ({ authenticated })
), null)(SavedQuotes));
