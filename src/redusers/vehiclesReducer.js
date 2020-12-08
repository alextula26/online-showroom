import { createAction, handleActions } from 'redux-actions';
import API from '../api';
// import { getUnionElements } from '../utils';

const fetchVehiclesSuccess = createAction('FETCH_VEHICLES');
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

  const promisesVehicles = vehicles.items.map(async ({ id }) => {
    const vehicle = await API.getVehicle(id);
    return { [id]: vehicle.general };
  });

  const promisesVehiclesSettled = await Promise.allSettled(promisesVehicles);

  const characteristics = promisesVehiclesSettled
    .filter((item) => item.status === 'fulfilled')
    .reduce((acc, { value }) => {
      const [vehicleId] = Object.keys(value);
      const [specifications] = Object.values(value);
      return { ...acc, [vehicleId]: specifications };
    }, {});

  dispatch(fetchVehiclesSuccess({ vehicles }));
  dispatch(fetchCharacteristicsSuccess({ characteristics }));

  return vehicles;
};

export default vehiclesReducer;
