import expect from 'expect';
import quoteAddVehicleReducer from '../reducer';
import { fromJS } from 'immutable';

describe('quoteAddVehicleReducer', () => {
  it('returns the initial state', () => {
    expect(quoteAddVehicleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
