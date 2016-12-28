import expect from 'expect';
import quoteContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('quoteContainerReducer', () => {
  it('returns the initial state', () => {
    expect(quoteContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
