import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const vehicleReducer = handleActions({
  [actions.fetchVehicleSuccess](state, { payload }) {
    return {
      ...state,
      vehicle: payload.vehicle,
    };
  },
}, { vehicle: {} });

export default vehicleReducer;
