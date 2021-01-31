import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const modelsReduser = handleActions({
  [actions.fetchModels](state, { payload }) {
    return {
      ...state,
      models: payload.models.items,
      brand: payload.models.brand,
    };
  },
}, { models: [], brand: {} });

export default modelsReduser;
