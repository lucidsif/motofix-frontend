/*
 *
 * QuoteCentral reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_TO_CART,
} from './constants';

const initialState = fromJS({});

function quoteCentralReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
    // push in to list
      return state.set('service', action.serviceName);
    default:
      return state;
  }
}

export default quoteCentralReducer;
