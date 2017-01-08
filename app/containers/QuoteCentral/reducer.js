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

const services = ['Accessory Installation', 'Air Filter Replacement', 'Brake Pad Replacement', 'Brakes Are Squeaking', 'Chain And Sprocket Replacement', 'Check Engine/FI Light Is On', 'Clean And Lube Chain', 'Fluids Are Leaking', 'Motorcycle Is Not Starting (Inspection)', 'Motorcycle Is Overheating', 'NY State Inspection', 'Pre-purchase Inspection', 'Smoke Or Steam Is Coming Out Of Motorcycle', 'Spongy braking', 'Suspension Tuning', 'Tire Replacement', 'Valve Adjustment', 'Warning Light Is On', 'Winterization','Oil Change'];

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
