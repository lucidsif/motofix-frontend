import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteCentralService state domain
 */
const selectQuoteCentralServiceDomain = () => (state) => state.get('quoteCentralService');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QuoteCentralService
 */

const selectQuoteCentralService = () => createSelector(
  selectQuoteCentralServiceDomain(),
  (substate) => substate.toJS()
);

export default selectQuoteCentralService;
export {
  selectQuoteCentralServiceDomain,
};
