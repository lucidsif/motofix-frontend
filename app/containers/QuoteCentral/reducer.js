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
  SAVE_QUOTE,
  RESET_SAVED_QUOTE,
} from './constants';
import services from './reducerServices';

const cart = services.reduce((acc, cur) => {
  const regexedService = cur.replace(/\s/g, '');
  // eslint-disable-next-line
  acc[regexedService] = { selected: false, laborTime: null, unavailable: null }; // eslint-disable-line no-param-reassign.
  return acc;
}, {});
const part = services.reduce((acc, cur) => {
  const regexedService = cur.replace(/\s/g, '');
  // eslint-disable-next-line
  acc[regexedService] = '';
  return acc;
}, {});

const quoteSaved = false;

const initialState = fromJS({ cart, part, quoteSaved });

function quoteCentralReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return state.setIn(['cart', action.payload, 'selected'], true);
    case REMOVE_FROM_CART:
      return state.setIn(['cart', action.payload, 'selected'], false);
    case SET_LABORTIME:
      return state.mergeIn(['cart', action.service], action.payload);
    case SET_PARTS_DATA:
      return state.mergeIn(['part', action.service], action.partsObj);
    case SAVE_QUOTE:
      return state.set('quoteSaved', true);
    case RESET_SAVED_QUOTE:
      return state.set('quoteSaved', false);
    default:
      return state;
  }
}

export default quoteCentralReducer;

