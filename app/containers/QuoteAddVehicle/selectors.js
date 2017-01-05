import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteAddVehicle state domain
 */
const selectVehicle = () => (state) => state.get('quoteAddVehicle');

/**
 * Other specific selectors
 */
const selectYear = () => createSelector(
  selectVehicle(),
  (vehicle) => vehicle.get('year')
);

const selectMake = () => createSelector(
  selectVehicle(),
  (vehicle) => vehicle.get('make')
);

const selectModel = () => createSelector(
  selectVehicle(),
  (vehicle) => vehicle.get('model')
);

/**
 * Default selector used by QuoteAddVehicle
 */

/*
const selectQuoteAddVehicle = () => createSelector(
  selectVehicle(),
  (substate) => substate.toJS()
);
*/
// export default selectQuoteAddVehicle;
export {
  selectVehicle,
  selectYear,
  selectMake,
  selectModel,
};
