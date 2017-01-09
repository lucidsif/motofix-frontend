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
  let regexedService = cur.replace(/\s/g, "");
  acc[regexedService] = '';
  return acc;
}, {});
// start with a single part and later evolve to multiple parts
const part = cart;

const estimate = { serviceTotal: 0, partsTotal: 0, total: 0, dealer: 0, priceSavings: 0, percentSavings: 0 };
const initialState = fromJS({ cart, part, estimate });

function quoteCentralReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return state.setIn(['cart', action.payload], true);
    case REMOVE_FROM_CART:
      return state.setIn(['cart', action.payload], false);
    default:
      return state;
  }
}

export default quoteCentralReducer;
