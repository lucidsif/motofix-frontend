/*
 *
 * QuoteAddVehicle reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_VEHICLE,
} from './constants';

const initialState = fromJS({
  year: '',
  make: '',
  model: '',
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
