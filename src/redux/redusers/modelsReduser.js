import { handleActions } from 'redux-actions';
import * as actions from '../../actions';

const modelsReduser = handleActions({
  [actions.fetchModels](state, { payload }) {
    return {
      ...state,
      models: payload.models.items,
      brand: payload.models.brand,
    };
  },
  [actions.changeModelsLoader](state, { payload }) {
    return {
      ...state,
      loading: payload.loading,
    };
  },
}, { models: [], brand: {}, loading: true });

export default modelsReduser;
