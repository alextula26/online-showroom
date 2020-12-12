import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const modelsReduser = handleActions({
  [actions.fetchModelsSuccess](state, { payload }) {
    return {
      ...state,
      models: payload.items,
    };
  },
  [actions.fetchBrandModelsSuccess](state, { payload }) {
    return {
      ...state,
      brand: payload.brand,
    };
  },
}, { models: [], brand: {} });

export default modelsReduser;
