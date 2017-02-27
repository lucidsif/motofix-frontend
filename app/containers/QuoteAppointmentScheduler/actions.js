/*
 *
 * QuoteAppointmentScheduler actions
 *
 */

import {
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
} from './constants';

export function setPaymentSuccess() {
  return {
    type: PAYMENT_SUCCESS,
  };
}

export function setPaymentFail() {
  return {
    type: PAYMENT_FAIL,
  };
}
