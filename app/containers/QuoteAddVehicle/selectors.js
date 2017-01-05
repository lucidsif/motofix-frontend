import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteAddVehicle state domain
 */
const selectVehicleDomain = () => (state) => state.get('quoteAddVehicle');

/**
 * Other specific selectors
 */
const selectYear = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.get('year')
);

const selectMake = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.get('make')
);

const selectModel = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.get('model')
);

// Default selector used by QuoteAddVehicle

const selectVehicle = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.toJS()
);

export default selectVehicle;
export {
  selectYear,
  selectMake,
  selectModel,
};
