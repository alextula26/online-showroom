import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchModelsSuccess = createAction('MODELS_FETCH_SUCCESS');
const fetchBrandModelsSuccess = createAction('BRAND_MODELS_FETCH_SUCCESS');

const modelsReduser = handleActions({
  [fetchModelsSuccess](state, { payload }) {
    return {
      ...state,
      models: payload.items,
    };
  },
  [fetchBrandModelsSuccess](state, { payload }) {
    return {
      ...state,
      brand: payload.brand,
    };
  },
}, { models: [], brand: {} });

export const fetchModels = (brandId) => async (dispatch) => {
  const models = await API.getModels(brandId);
  const { items, brand } = models;
  dispatch(fetchModelsSuccess({ items }));
  dispatch(fetchBrandModelsSuccess({ brand }));
};

export default modelsReduser;
