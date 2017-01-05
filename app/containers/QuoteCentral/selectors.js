import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteCentralService state domain
 */
const selectQuoteCentralDomain = () => (state) => state.get('quoteCentral');

/*
 * Default selector used by QuoteCentralService
 */
const selectQuoteCentral = () => createSelector(
   selectQuoteCentralDomain(),
   (substate) => substate.toJS()
);

/**
 * Other specific selectors
 */
const selectCart = () => createSelector(
     selectQuoteCentralDomain(),
     (substate) => substate.get('cart').toJS()
 );

export default selectQuoteCentral;
export {
   selectCart,
};
