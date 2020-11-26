import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchVehiclesSuccess = createAction('FETCH_CARS');
const fetchCharacteristicSuccess = createAction('FETCH_CHARACTERISTIC');

const vehiclesReducer = handleActions({
  [fetchVehiclesSuccess](state, { payload }) {
    return { ...state, vehicles: payload.vehicles };
  },
  [fetchCharacteristicSuccess](state, { payload }) {
    console.log('payload', payload);
    return {
      ...state,
      characteristics: {
        ...state.characteristics,
        [payload.modificationId]: payload.characteristics,
      },
    };
  },
}, { vehicles: [], characteristics: {} });

export const fetchVehicles = (modelId) => async (dispatch) => {
  const vehicles = await API.getVehicles(modelId);
  console.log('vehicles', vehicles);
  dispatch(fetchVehiclesSuccess({ vehicles }));

  return vehicles;
};

export const fetchCharacteristic = (modificationId) => async (dispatch) => {
  const characteristics = await API.getCharacteristics(modificationId);
  console.log('characteristics', characteristics);
  dispatch(fetchCharacteristicSuccess({ modificationId, characteristics }));
};

export default vehiclesReducer;
