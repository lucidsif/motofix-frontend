import expect from 'expect';
import savedQuotesReducer from '../reducer';
import { fromJS } from 'immutable';

describe('savedQuotesReducer', () => {
  it('returns the initial state', () => {
    expect(savedQuotesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
