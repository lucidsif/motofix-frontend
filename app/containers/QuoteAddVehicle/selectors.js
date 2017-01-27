import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteAddVehicle state domain
 */
const selectVehicleDomain = () => (state) => state.get('quoteAddVehicle');

/**
 * Other specific selectors
 */


const selectMid = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.get('mid')
);

const selectManufacturer = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.get('manufacturer')
);

const selectModel = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.get('model')
);

const selectModelVariant = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.get('model_variant')
);

const selectYear = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.get('year')
);

// Default selector used by QuoteAddVehicle

const selectVehicle = () => createSelector(
  selectVehicleDomain(),
  (vehicleState) => vehicleState.toJS()
);

export default selectVehicle;
export {
  selectMid,
  selectManufacturer,
  selectModel,
  selectModelVariant,
  selectYear,
};
