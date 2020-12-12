import { createAction } from 'redux-actions';
import API from '../api';

export const fetchDealersSuccess = createAction('DEALERS_FETCH_SUCCESS');
export const fetchBrandsSuccess = createAction('BRANDS_FETCH_SUCCESS');
export const fetchModelsSuccess = createAction('MODELS_FETCH_SUCCESS');
export const fetchBrandModelsSuccess = createAction('BRAND_MODELS_FETCH_SUCCESS');
export const fetchVehiclesSuccess = createAction('FETCH_VEHICLES');
export const fetchCharacteristicsSuccess = createAction('FETCH_CHARACTERISTICS');
export const fetchVehicleSuccess = createAction('FETCH_VEHICLE');

export const setModification = createAction('SET_MODIFICATION');
export const removeModification = createAction('REMOVE_MODIFICATION');
export const setEquipment = createAction('SET_EQUIPMENT');
export const removeEquipment = createAction('REMOVE_EQUIPMENT');

export const fetchDealers = () => async (dispatch) => {
  const dealers = await API.getDealers();
  dispatch(fetchDealersSuccess({ dealers }));
};

export const fetchBrands = () => async (dispatch) => {
  const brands = await API.getBrands();
  dispatch(fetchBrandsSuccess({ brands }));
};

export const fetchModels = (brandId) => async (dispatch) => {
  const models = await API.getModels(brandId);
  const { items, brand } = models;
  dispatch(fetchModelsSuccess({ items }));
  dispatch(fetchBrandModelsSuccess({ brand }));
};

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

export const fetchVehicle = (vehicleId) => async (dispatch) => {
  const vehicle = await API.getVehicle(vehicleId);
  dispatch(fetchVehicleSuccess({ vehicle }));
};
