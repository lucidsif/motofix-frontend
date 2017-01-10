/*
 *
 * QuoteCentralService actions
 *
 */

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_LABORTIME,
} from './constants';

export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}
export function removeFromCart(payload) {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
}
export function setLaborTime(service, laborTime) {
  return {
    type: SET_LABORTIME,
    service,
    laborTime,
  };
}
// TODO: Create setPartTime action creator here
