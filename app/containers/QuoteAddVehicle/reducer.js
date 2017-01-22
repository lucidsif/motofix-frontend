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
  mid: null,
  manufacturer: null,
  model: null,
  model_variant: null,
  tuning_description: null,
  start_year: null,
  end_year: null,
  year: null,
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
