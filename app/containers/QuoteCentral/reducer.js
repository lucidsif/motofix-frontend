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

const services = ['Oil Change', 'Smoke or steam is coming out of motorcycle', 'NY State Inspection', 'Motorcycle is not starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check engine/FI light in on', 'Warning light is on', 'Fluids are leaking', 'Motorcycle is overheating', 'Brakes are squeaking', 'Spongy braking'];
const cart = services.reduce((acc, cur, i) => {
  acc[cur] = { selected: false, found: null, laborTime: null, laborPrice: null };
  return acc;
}, {});

const estimate = { serviceTotal: 0, partsTotal: 0, total: 0, dealer: 0, priceSavings: 0, percentSavings: 0 };
const initialState = fromJS({ cart, estimate });
// Modify reducer so it uses the 2 parameters - makes serviced selected true and adds price to servicetotal
function quoteCentralReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return state.setIn(['cart', action.payload.serviceName, 'selected'], true);
    case REMOVE_FROM_CART:
      return state.setIn(['cart', action.payload.serviceName, 'selected'], false);
    default:
      return state;
  }
}

export default quoteCentralReducer;
