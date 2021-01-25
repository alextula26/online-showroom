import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const newVehiclesReducer = handleActions({
  [actions.fetchNewVehicles](state, { payload }) {
    return {
      ...state,
      vehicles: payload.vehicles,
    };
  },
}, { vehicles: {} });

export default newVehiclesReducer;
