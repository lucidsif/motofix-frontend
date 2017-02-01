import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteCentralService state domain
 */
const selectQuoteCentralDomain = () => (state) => state.get('quoteCentral');

/**
 * Other specific selectors
 */
const selectCart = () => createSelector(
     selectQuoteCentralDomain(),
     (quoteCentralState) => quoteCentralState.get('cart').toJS()
 );

const selectPart = () => createSelector(
   selectQuoteCentralDomain(),
   (quoteCentralState) => quoteCentralState.get('part').toJS()
);

const selectSavedQuote = () => createSelector(
  selectQuoteCentralDomain(),
  (quoteCentralState) => quoteCentralState.get('quoteSaved')
);

/*
 * Default selector used by QuoteCentralService
 */
const selectQuoteCentral = () => createSelector(
   selectQuoteCentralDomain(),
   (quoteCentralState) => quoteCentralState.toJS()
);

export default selectQuoteCentral;
export {
  selectCart,
  selectPart,
  selectSavedQuote,
};
