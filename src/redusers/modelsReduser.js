import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const modelsReduser = handleActions({
  [actions.fetchModels](state, { payload }) {
    return {
      ...state,
      models: payload.items,
    };
  },
  [actions.fetchBrandModels](state, { payload }) {
    return {
      ...state,
      brand: payload.brand,
    };
  },
}, { models: [], brand: {} });

export default modelsReduser;
