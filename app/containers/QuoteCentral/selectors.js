import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteCentralService state domain
 */
const selectQuoteCentralDomain = () => (state) => state.get('quoteCentralService');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QuoteCentralService
 */

const selectQuoteCentral = () => createSelector(
  selectQuoteCentralDomain(),
  (substate) => substate.toJS()
);

export default selectQuoteCentral;
export {
  selectQuoteCentralDomain,
};
