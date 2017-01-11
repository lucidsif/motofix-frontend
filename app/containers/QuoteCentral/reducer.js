/*
 *
 * QuoteCentral reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_LABORTIME,
  SET_PARTS_DATA,
} from './constants';
import services from './reducerServices';


const cart = services.reduce((acc, cur, i) => {
  let regexedService = cur.replace(/\s/g, "");
  acc[regexedService] = {selected: false, laborTime: null};
  return acc;
}, {});
const part = services.reduce((acc, cur, i) => {
  let regexedService = cur.replace(/\s/g, "");
  acc[regexedService] = {};
  return acc;
}, {});
const estimate = { serviceTotal: 0, partsTotal: 0, total: 0, dealer: 0, priceSavings: 0, percentSavings: 0 };

const initialState = fromJS({ cart, part, estimate });

function quoteCentralReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return state.setIn(['cart', action.payload, 'selected'], true);
    case REMOVE_FROM_CART:
      return state.setIn(['cart', action.payload, 'selected'], false);
    case SET_LABORTIME:
      return state.setIn(['cart', action.service, 'laborTime'], action.laborTime);
    case SET_PARTS_DATA:
      return state.mergeIn(['part', action.service], action.partsObj);
    default:
      return state;
  }
}

export default quoteCentralReducer;
