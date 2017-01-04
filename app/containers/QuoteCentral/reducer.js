/*
 *
 * QuoteCentralService reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_TO_CART,
} from './constants';

const initialState = fromJS({
  services: [],
});

function quoteCentralReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
    // push in to list
      return state.push(action.serviceName);
    default:
      return state;
  }
}

export default quoteCentralReducer;
