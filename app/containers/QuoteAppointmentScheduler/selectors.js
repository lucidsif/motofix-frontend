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

const selectQuoteAppointmentScheduler = () => createSelector(
  selectQuoteAppointmentSchedulerDomain(),
  (substate) => substate.toJS()
);

export default selectQuoteAppointmentScheduler;
export {
  selectQuoteAppointmentSchedulerDomain,
};
