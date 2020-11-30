import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchVehicleSuccess = createAction('FETCH_VEHICLE');

const vehicleReducer = handleActions({
  [fetchVehicleSuccess](state, { payload }) {
    return {
      ...state,
      vehicle: payload.vehicle,
    };
  },
}, { vehicle: {} });

export const fetchVehicle = (vehicleId) => async (dispatch) => {
  const vehicle = await API.getVehicle(vehicleId);
  dispatch(fetchVehicleSuccess({ vehicle }));
};

export default vehicleReducer;
