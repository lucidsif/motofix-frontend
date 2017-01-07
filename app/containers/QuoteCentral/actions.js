/*
 *
 * QuoteCentralService actions
 *
 */

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from './constants';

export function addToCart(serviceName) {
  return {
    type: ADD_TO_CART,
    serviceName,
  };
}
// Find out what the merged object looks like. Preserve the servicename if possibe
export function removeFromCart(serviceName) {
  return {
    type: REMOVE_FROM_CART,
    serviceName,
  };
}
