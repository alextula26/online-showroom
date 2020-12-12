import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const brandsReduser = handleActions({
  [actions.fetchBrandsSuccess](state, { payload }) {
    return [...state, ...payload.brands];
  },
}, []);

export default brandsReduser;
