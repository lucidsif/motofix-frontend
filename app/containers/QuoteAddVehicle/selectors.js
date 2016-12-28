import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteAddVehicle state domain
 */
const selectQuoteAddVehicleDomain = () => (state) => state.get('quoteAddVehicle');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QuoteAddVehicle
 */

const selectQuoteAddVehicle = () => createSelector(
  selectQuoteAddVehicleDomain(),
  (substate) => substate.toJS()
);

export default selectQuoteAddVehicle;
export {
  selectQuoteAddVehicleDomain,
};
