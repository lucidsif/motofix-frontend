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

const services = ['Oil Change', 'Smoke Or Steam Is Coming Out Of Motorcycle', 'NY State Inspection', 'Motorcycle Is Not Starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check Engine/FI Light Is On', 'Warning Light Is On', 'Fluids Are Leaking', 'Motorcycle Is Overheating', 'Brakes Are Squeaking', 'Spongy braking'];
const cart = services.reduce((acc, cur, i) => {
  acc[cur] = { selected: false, laborTime: null };
  return acc;
}, {});

const estimate = { serviceTotal: 0, partsTotal: 0, total: 0, dealer: 0, priceSavings: 0, percentSavings: 0 };
const initialState = fromJS({ cart, estimate });
// Modify reducer so it uses the 2 parameters - makes serviced selected true and adds price to servicetotal
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
