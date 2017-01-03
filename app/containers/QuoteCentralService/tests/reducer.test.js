import expect from 'expect';
import quoteCentralServiceReducer from '../reducer';
import { fromJS } from 'immutable';

describe('quoteCentralServiceReducer', () => {
  it('returns the initial state', () => {
    expect(quoteCentralServiceReducer(undefined, {})).toEqual(fromJS({}));
  });
});
