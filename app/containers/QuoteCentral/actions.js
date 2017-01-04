/*
 *
 * QuoteCentralService actions
 *
 */

import {
  ADD_TO_CART,
} from './constants';

export function addToCart(serviceName) {
  return {
    type: ADD_TO_CART,
    serviceName,
  };
}
