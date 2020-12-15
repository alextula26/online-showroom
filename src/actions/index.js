import { createAction } from 'redux-actions';
import API from '../api';
import { getListForFilter, isEmpty } from '../utils';

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

const getVehiclesCharacteristics = async (vehicles) => {
  const promisesVehicles = vehicles.map(async ({ id }) => {
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

  return characteristics;
};

export const fetchVehicles = (modelId, options = {}) => async (dispatch) => {
  const vehicles = await API.getVehicles(modelId);
  const characteristics = await getVehiclesCharacteristics(vehicles.items);
  const modificationsForFilter = getListForFilter(vehicles.items, 'modification', 'modification_name');
  const equipmentsForFilter = getListForFilter(vehicles.items, 'equipment', 'equipment_name');
  console.log(options);
  if (isEmpty(options)) {
    dispatch(setModificationsForFilter({ modificationsForFilter }));
    dispatch(setEquipmentsForFilter({ equipmentsForFilter }));
  }

  dispatch(fetchCharacteristicsSuccess({ characteristics }));
  dispatch(fetchVehiclesSuccess({ vehicles }));
};

export const fetchVehicle = (vehicleId) => async (dispatch) => {
  const vehicle = await API.getVehicle(vehicleId);
  dispatch(fetchVehicleSuccess({ vehicle }));
};

export const fetchVehicleFilteredByElement = (
  currentFilter, elementId, modelId,
) => async () => {
  console.log('currentFilter', currentFilter);
  console.log('elementId', elementId);
  console.log('modelId', modelId);
};
