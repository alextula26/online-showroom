import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchBrandsSuccess = createAction('BRANDS_FETCH_SUCCESS');

const brandsReduser = handleActions({
  [fetchBrandsSuccess](state, { payload }) {
    return [...state, ...payload.brands];
  },
}, []);

export const fetchBrands = () => async (dispatch) => {
  const brands = await API.getBrands();
  dispatch(fetchBrandsSuccess({ brands }));
};

export default brandsReduser;
