import { createSelector } from 'reselect';

/**
 * Direct selector to the quoteAppointmentScheduler state domain
 */
const selectQuoteAppointmentSchedulerDomain = () => (state) => state.get('quoteAppointmentScheduler');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QuoteAppointmentScheduler
 */

const selectPaid = () => createSelector(
  selectQuoteAppointmentSchedulerDomain(),
  (substate) => substate.get('paid')
);

export default selectQuoteAppointmentSchedulerDomain;
export {
  selectQuoteAppointmentSchedulerDomain,
  selectPaid,
};
