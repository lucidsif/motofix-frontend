/*
 *
 * QuoteCentralService actions
 *
 */

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  SET_LABORTIME,
  SET_PARTS_DATA,
  RESET_PART,
  SAVE_QUOTE,
  RESET_SAVED_QUOTE,
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

export function resetCart() {
  return {
    type: RESET_CART,
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

export function resetPart() {
  return {
    type: RESET_PART,
  };
}

export function setSavedQuoteTrue() {
  return {
    type: SAVE_QUOTE,
  };
}

export function resetSavedQuote() {
  return {
    type: RESET_SAVED_QUOTE,
  };
}
