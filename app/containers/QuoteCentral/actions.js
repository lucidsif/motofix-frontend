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

export function removeFromCart(serviceName) {
  return {
    type: REMOVE_FROM_CART,
    serviceName,
  };
}
