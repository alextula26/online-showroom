import { createAction, handleActions } from 'redux-actions';
import API from '../api';
import { getUnionElements } from '../utils';

const fetchVehiclesSuccess = createAction('FETCH_CARS');
const fetchCharacteristicsSuccess = createAction('FETCH_CHARACTERISTICS');

const vehiclesReducer = handleActions({
  [fetchVehiclesSuccess](state, { payload }) {
    return {
      ...state,
      vehicles: payload.vehicles,
    };
  },
  [fetchCharacteristicsSuccess](state, { payload }) {
    return {
      ...state,
      characteristics: payload.characteristics,
    };
  },
}, { vehicles: [], characteristics: {} });

export const fetchVehicles = (modelId) => async (dispatch) => {
  const vehicles = await API.getVehicles(modelId);
  const modificationIds = vehicles.map(({ modification }) => modification);
  const unionModificationIds = getUnionElements(modificationIds);
  const promises = unionModificationIds
    .map(async (modificationId) => {
      const characteristics = await API.getCharacteristics(modificationId);
      return { [modificationId]: characteristics };
    });

  const characteristicsSettled = await Promise.allSettled(promises);

  const characteristics = {
    ...characteristicsSettled
      .filter((characteristic) => characteristic.status === 'fulfilled')
      .map(({ value }) => value),
  };

  dispatch(fetchVehiclesSuccess({ vehicles }));
  dispatch(fetchCharacteristicsSuccess({ characteristics }));

  return vehicles;
};

export default vehiclesReducer;
