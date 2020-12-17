import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const vehiclesReducer = handleActions({
  [actions.fetchVehiclesSuccess](state, { payload }) {
    return {
      ...state,
      vehicles: payload.vehicles,
    };
  },
}, { vehicles: {} });

export default vehiclesReducer;
