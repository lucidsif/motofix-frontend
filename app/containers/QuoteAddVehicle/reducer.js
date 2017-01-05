/*
 *
 * QuoteAddVehicle reducer
 *
 */
// TODO: Change addvehicle actions and reducers to updatevehicle

import { fromJS } from 'immutable';
import {
  ADD_VEHICLE,
} from './constants';

const initialState = fromJS({
  year: null,
  make: null,
  model: null,
});

function quoteAddVehicleReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VEHICLE:
      return state.merge(action.vehicle);
    default:
      return state;
  }
}

export default quoteAddVehicleReducer;
