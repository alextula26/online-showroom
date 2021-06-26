import { handleActions } from 'redux-actions';
import * as actions from '../../actions';

const brandsReduser = handleActions({
  [actions.fetchBrands](state, { payload }) {
    return {
      ...state,
      brands: payload.brands.items,
    };
  },
}, { brands: [] });

export default brandsReduser;
