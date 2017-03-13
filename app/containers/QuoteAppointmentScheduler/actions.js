/*
 *
 * QuoteAppointmentScheduler actions
 *
 */

import {
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  PAYMENT_RESET,
  PAYMENT_APPOINTMENT_ERROR,
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

export function setPaymentNull() {
  return {
    type: PAYMENT_RESET,
  };
}

export function setPaymentError() {
  return {
    type: PAYMENT_APPOINTMENT_ERROR,
  };
}
