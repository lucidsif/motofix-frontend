/*
 *
 * QuoteCentral reducer
 *
 */

import { fromJS, mergeWith } from 'immutable';
import {
  ADD_TO_CART,
} from './constants';

const services = ['NY State Inspection', 'Motorcycle is not starting (Inspection)', 'Pre-purchase Inspection', 'Winterization', 'Air Filter Replacement', 'Chain & Sprocket Replacement', 'Clean & Lube Chain', 'Valve Adjustment', 'Accessory Installation', 'Suspension Tuning', 'Tire Replacement', 'Brake Pad Replacement', 'Check engine/FI light in on', 'Warning light is on', 'Fluids are leaking', 'Motorcycle is overheating', 'Brakes are squeaking', 'Spongy braking'];
const cart = services.reduce((acc, cur, i) => {
  acc[cur] = false;
  return acc;
}, {});
const initialState = fromJS({ cart });

function quoteCentralReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
    // push in to list
      return state.setIn(['cart', JSON.stringify(action.serviceName)], true);
    default:
      return state;
  }
}

export default quoteCentralReducer;
