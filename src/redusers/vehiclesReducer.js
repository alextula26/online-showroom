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
}, { vehicles: {}, characteristics: {} });

export const fetchVehicles = (modelId) => async (dispatch) => {
  const vehicles = await API.getVehicles(modelId);
  // getting all modification ids for cars
  const modificationIds = vehicles.items.map(({ modification }) => modification);
  // getting unique modification ids
  const unionModificationIds = getUnionElements(modificationIds);
  // getting characteristics by modification id
  const promises = unionModificationIds
    .map(async (modificationId) => {
      const characteristics = await API.getCharacteristics(modificationId);
      return { [modificationId]: characteristics };
    });

  const characteristicsSettled = await Promise.allSettled(promises);

  const characteristics = characteristicsSettled
    .filter((characteristic) => characteristic.status === 'fulfilled')
    .reduce((acc, { value }) => {
      const [modificationId] = Object.keys(value);
      const [characteristicsList] = Object.values(value);
      const mainCharacteristics = characteristicsList.reduce((accN, item) => {
        if (item.id === 2) {
          return { ...accN, body: item };
        }

        if (item.id === 12) {
          return { ...accN, engineType: item };
        }

        if (item.id === 13) {
          return { ...accN, engine: item };
        }

        if (item.id === 14) {
          return { ...accN, power: item };
        }

        if (item.id === 24) {
          return { ...accN, kpp: item };
        }

        if (item.id === 27) {
          return { ...accN, drive: item };
        }

        return accN;
      }, {});

      return { ...acc, [modificationId]: mainCharacteristics };
    }, {});

  dispatch(fetchVehiclesSuccess({ vehicles }));
  dispatch(fetchCharacteristicsSuccess({ characteristics }));

  return vehicles;
};

export default vehiclesReducer;
