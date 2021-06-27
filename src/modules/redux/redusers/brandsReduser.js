import { handleActions } from 'redux-actions';
import * as actions from 'modules/redux/actions';

const brandsReduser = handleActions({
  [actions.fetchBrands](state, { payload }) {
    return {
      ...state,
      brands: payload.brands.items,
    };
  },
}, { brands: [] });

export default brandsReduser;
