import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchCarsSuccess = createAction('FETCH_CARS');

const vehiclesReducer = handleActions({
  [fetchCarsSuccess](state, { payload }) {
    return { ...state, vehicles: payload.vehicles };
  },
}, { vehicles: [], modifications: [] });

export const fetchVehicles = (modelId) => async (dispatch) => {
  const vehicles = await API.getCars(modelId);
  dispatch(fetchCarsSuccess({ vehicles }));
};

export default vehiclesReducer;
