import expect from 'expect';
import quoteAppointmentSchedulerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('quoteAppointmentSchedulerReducer', () => {
  it('returns the initial state', () => {
    expect(quoteAppointmentSchedulerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
