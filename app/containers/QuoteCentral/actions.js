/*
 *
 * QuoteCentralService actions
 *
 */

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from './constants';

export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}
// Find out what the merged object looks like. Preserve the servicename if possibe
export function removeFromCart(payload) {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
}
