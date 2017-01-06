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
};
