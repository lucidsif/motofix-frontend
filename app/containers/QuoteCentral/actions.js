/*
 *
 * QuoteCentralService actions
 *
 */

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_LABORTIME,
  SET_PARTS_DATA,
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
export function setLaborTime(service, laborTime, unavailable) {
  const payload = {
    service,
    laborTime,
    unavailable,
  };
  return {
    type: SET_LABORTIME,
    service,
    payload,
  };
}
export function setPartsData(service, partsObj) {
  return {
    type: SET_PARTS_DATA,
    service,
    partsObj,
  };
}

