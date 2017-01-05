import { createSelector } from 'reselect';
// TODO: reverse domain and non domain names of selectors
/**
 * Direct selector to the quoteAddVehicle state domain
 */
const selectVehicle = () => (state) => state.get('quoteAddVehicle');


// the fact that the selector is getting empty string values is probably causing the warning
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

// Default selector used by QuoteAddVehicle

const selectVehicleDomain = () => createSelector(
  selectVehicle(),
  (vehicle) => vehicle.toJS()
);

export default selectVehicleDomain;
export {
  selectYear,
  selectMake,
  selectModel,
};
