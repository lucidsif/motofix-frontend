/*
 *
 * QuoteAddVehicle actions
 *
 */

import {
  ADD_VEHICLE,
  RESET_VEHICLE,
} from './constants';

export function addVehicle(vehicle) {
  return {
    type: ADD_VEHICLE,
    vehicle,
  };
}

export function resetVehicle() {
  return {
    type: RESET_VEHICLE,
  };
}
