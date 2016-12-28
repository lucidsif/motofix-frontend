import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteContainer state domain
 */
const selectQuoteContainerDomain = () => (state) => state.get('quoteContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QuoteContainer
 */

const selectQuoteContainer = () => createSelector(
  selectQuoteContainerDomain(),
  (substate) => substate.toJS()
);

export default selectQuoteContainer;
export {
  selectQuoteContainerDomain,
};
