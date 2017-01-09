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


const cart = services.reduce((acc, cur, i) => {
  acc[cur] = { name: cur, selected: false, laborTime: null };
  return acc;
}, {});
// start with a single part and later evolve to multiple parts
const part = cart;

const estimate = { serviceTotal: 0, partsTotal: 0, total: 0, dealer: 0, priceSavings: 0, percentSavings: 0 };
const initialState = fromJS({ cart, estimate, part });

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
