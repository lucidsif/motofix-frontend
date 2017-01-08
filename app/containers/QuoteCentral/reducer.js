/*
 *
 * QuoteCentral reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from './constants';
import services from './reducerServices';

// centralize array of services

const cart = services.reduce((acc, cur, i) => {
  acc[cur] = { selected: false, laborTime: null };
  return acc;
}, {});

const estimate = { serviceTotal: 0, partsTotal: 0, total: 0, dealer: 0, priceSavings: 0, percentSavings: 0 };
const initialState = fromJS({ cart, estimate });

function quoteCentralReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return state.mergeIn(['cart'], action.payload);
    case REMOVE_FROM_CART:
      return state.mergeIn(['cart'], action.payload);
    default:
      return state;
  }
}

export default quoteCentralReducer;
