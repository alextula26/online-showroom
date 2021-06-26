import { handleActions } from 'redux-actions';
import * as actions from '../../actions';

const newVehiclesReducer = handleActions({
  [actions.fetchNewVehicles](state, { payload }) {
    return {
      ...state,
      vehicles: payload.vehicles.items,
      model: payload.vehicles.model,
      brand: payload.vehicles.brand,
    };
  },
  [actions.changeVehiclesLoader](state, { payload }) {
    return {
      ...state,
      loading: payload.loading,
    };
  },
}, {
  vehicles: [],
  model: {},
  brand: {},
  loading: true,
});

export default newVehiclesReducer;
