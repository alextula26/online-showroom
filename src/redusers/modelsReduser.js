import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchModelsSuccess = createAction('MODELS_FETCH_SUCCESS');

const modelsReduser = handleActions({
  [fetchModelsSuccess](state, { payload }) {
    return [...state, ...payload.models];
  },
}, []);

export const fetchModels = (brandId) => async (dispatch) => {
  const models = await API.getModels(brandId);
  dispatch(fetchModelsSuccess({ models }));
};

export default modelsReduser;
