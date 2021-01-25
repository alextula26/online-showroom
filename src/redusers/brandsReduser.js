import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const brandsReduser = handleActions({
  [actions.fetchBrands](state, { payload }) {
    return [...state, ...payload.brands];
  },
}, []);

export default brandsReduser;
