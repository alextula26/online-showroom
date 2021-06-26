import { handleActions } from 'redux-actions';
import * as actions from '../../actions';

const newVehicleReducer = handleActions({
  [actions.fetchNewVehicle](state, { payload }) {
    return {
      ...state,
      vehicle: payload.vehicle,
    };
  },
}, { vehicle: {} });

export default newVehicleReducer;
