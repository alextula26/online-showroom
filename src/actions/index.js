import { createAction } from 'redux-actions';
import API from '../api';
import { getListForFilter, getQueryString, includes } from '../utils';

// Action creators for API requests
export const fetchDealersSuccess = createAction('DEALERS_FETCH_SUCCESS');
export const fetchBrandsSuccess = createAction('BRANDS_FETCH_SUCCESS');
export const fetchModelsSuccess = createAction('MODELS_FETCH_SUCCESS');
export const fetchBrandModelsSuccess = createAction('BRAND_MODELS_FETCH_SUCCESS');
export const fetchVehiclesSuccess = createAction('FETCH_VEHICLES');
export const fetchCharacteristicsSuccess = createAction('FETCH_CHARACTERISTICS');
export const fetchVehicleSuccess = createAction('FETCH_VEHICLE');

// Action creators for filters
export const selectModification = createAction('SELECT_MODIFICATION');
export const unSelectModification = createAction('UNSELECT_MODIFICATION');
export const selectEquipment = createAction('SELECT_EQUIPMENT');
export const unSelectEquipment = createAction('UNSELECT_EQUIPMENT');
export const setModificationsForFilter = createAction('SET_MODIFICATIONS_FOR_FILTER');
export const setEquipmentsForFilter = createAction('SET_EQUIPMENTS_FOR_FILTER');

export const setSelected = createAction('SET_SELECTED');

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

const getVehicles = async (modelId, options) => {
  const vehicles = await API.getVehicles(modelId, options);
  const promisesVehicles = vehicles.items.map(async (vehicle) => {
    const { general } = await API.getVehicle(vehicle.id);
    return { ...vehicle, general };
  });

  const promisesVehiclesSettled = await Promise.allSettled(promisesVehicles);

  const items = promisesVehiclesSettled
    .filter((item) => item.status === 'fulfilled')
    .map(({ value }) => value);

  return { ...vehicles, items };
};

export const fetchVehicles = (modelId) => async (dispatch) => {
  const vehicles = await getVehicles(modelId);
  const modificationsForFilter = getListForFilter(vehicles.items, 'modification', 'modification_name');
  const equipmentsForFilter = getListForFilter(vehicles.items, 'equipment', 'equipment_name');
  dispatch(setModificationsForFilter({ modificationsForFilter }));
  dispatch(setEquipmentsForFilter({ equipmentsForFilter }));
  dispatch(fetchVehiclesSuccess({ vehicles }));
};

export const fetchVehicle = (vehicleId) => async (dispatch) => {
  const vehicle = await API.getVehicle(vehicleId);
  dispatch(fetchVehicleSuccess({ vehicle }));
};

export const fetchVehiclesByFilter = (options) => async (dispatch) => {
  const {
    modelId, name, selectId, selected,
  } = options;

  const selectedFilters = {
    ...selected,
    [name]: includes(selected[name], selectId)
      ? selected[name].filter((item) => item !== selectId)
      : [...selected[name], selectId],
  };
  dispatch(setSelected({ selected: selectedFilters }));

  const query = getQueryString(selectedFilters);
  const vehicles = await getVehicles(modelId, query);
  dispatch(fetchVehiclesSuccess({ vehicles }));
};
