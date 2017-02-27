/*
 *
 * QuoteAppointmentScheduler reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
} from './constants';

const paid = null;
const initialState = fromJS({
  paid,
});

function quoteAppointmentSchedulerReducer(state = initialState, action) {
  switch (action.type) {
    case PAYMENT_SUCCESS:
      return state.set('paid', true);
    case PAYMENT_FAIL:
      return state.set('paid', false);
    default:
      return state;
  }
}

export default quoteAppointmentSchedulerReducer;
