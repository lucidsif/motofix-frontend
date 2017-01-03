/*
 *
 * QuoteAddVehicle actions
 *
 */

import {
  ADD_VEHICLE,
} from './constants';

export function addVehicle(vehicle) {
  return {
    type: ADD_VEHICLE,
    vehicle,
  };
}
