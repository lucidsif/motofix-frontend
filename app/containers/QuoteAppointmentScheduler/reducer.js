/*
 *
 * QuoteAppointmentScheduler reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  PAYMENT_RESET,
  PAYMENT_APPOINTMENT_ERROR,
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
    case PAYMENT_RESET:
      return state.set('paid', null);
    case PAYMENT_APPOINTMENT_ERROR:
      return state.set('paid', 'error');
    default:
      return state;
  }
}

export default quoteAppointmentSchedulerReducer;
