import { createSelector } from 'reselect';

/**
 * Direct selector to the savedQuotes state domain
 */
const selectSavedQuotesDomain = () => (state) => state.get('savedQuotes');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SavedQuotes
 */

const selectSavedQuotes = () => createSelector(
  selectSavedQuotesDomain(),
  (substate) => substate.toJS()
);

export default selectSavedQuotes;
export {
  selectSavedQuotesDomain,
};
