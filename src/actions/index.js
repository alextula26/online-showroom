import { createAction } from 'redux-actions';
import API from '../api';
import { getListForFilter } from '../utils';

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

export const setEquipmentsSelected = createAction('SET_EQUIPMENTS_SELECTED');

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

export const fetchVehiclesByFilter = (model, name, selectId, selected) => async (dispatch) => {
  console.log('selectId', Number(selectId));
  console.log('selected', selected);
  console.log('modelId', model);
  console.log('name', selected[name]);

  const newSelected = { ...selected, [name]: [...selected[name], selectId] };
  console.log('newSelected', newSelected);

  if (name === 'modifications') {
    dispatch(setEquipmentsSelected({ selected: newSelected }));
  }

  const mappingOptions = {
    modifications: (item) => `modification[]=${item}`,
    equipments: (item) => `equipment[]=${item}`,
  };

  const keys1 = Object.keys(newSelected);

  const result1 = keys1.reduce((acc, key) => {
    if (newSelected[key].length === 0) {
      return acc;
    }

    const query = newSelected[key].map((item) => mappingOptions[key](item));

    return [...acc, query.join('&')];
  }, '?');

  console.log('result1', result1.join(''));

  const vehicles = await getVehicles(model, result1.join(''));

  console.log(vehicles);

  dispatch(fetchVehiclesSuccess({ vehicles }));
};
