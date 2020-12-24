import { createAction } from 'redux-actions';
import API from '../api';
import {
  getLisFilterItems, getQueryString, addSelectedFilterItem, getIdsItemsFilter,
} from '../utils';

// Action creators for API requests
export const fetchDealersSuccess = createAction('DEALERS_FETCH_SUCCESS');
export const fetchBrandsSuccess = createAction('BRANDS_FETCH_SUCCESS');
export const fetchModelsSuccess = createAction('MODELS_FETCH_SUCCESS');
export const fetchBrandModelsSuccess = createAction('BRAND_MODELS_FETCH_SUCCESS');
export const fetchVehiclesSuccess = createAction('FETCH_VEHICLES');
export const fetchCharacteristicsSuccess = createAction('FETCH_CHARACTERISTICS');
export const fetchVehicleSuccess = createAction('FETCH_VEHICLE');

// Action creators for filters
export const selectModificationsFilterItem = createAction('SELECT_MODIFICATION_FILTER_ITEM');
export const selectEquipmentsFilterItem = createAction('SELECT_EQUIPMENT_FILTER_ITEM');
export const setModificationsFilter = createAction('SET_MODIFICATIONS_FILTER');
export const setEquipmentsFilter = createAction('SET_EQUIPMENTS_FILTER');
export const setSelectedFilterItems = createAction('SET_SELECTED_FILTER_ITEMS');
export const setDisabledModificationFilterItems = createAction('SET_DISABLED_MODIFICATION_FILTER_ITEMS');
export const setDisabledEquipmentFilterItems = createAction('SET_DISABLED_EQUIPMENT_FILTER_ITEMS');

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
  const modificationsForFilter = getLisFilterItems(vehicles.items, 'modification', 'modification_name');
  const equipmentsForFilter = getLisFilterItems(vehicles.items, 'equipment', 'equipment_name');
  dispatch(setModificationsFilter({ modificationsForFilter }));
  dispatch(setEquipmentsFilter({ equipmentsForFilter }));
  dispatch(fetchVehiclesSuccess({ vehicles }));
};

export const fetchVehicle = (vehicleId) => async (dispatch) => {
  const vehicle = await API.getVehicle(vehicleId);
  dispatch(fetchVehicleSuccess({ vehicle }));
};

export const fetchFilterVehicles = (options) => async (dispatch) => {
  const {
    modelId, filterName, selectedItemId, selectedItems,
  } = options;

  const selectedFilterItems = addSelectedFilterItem(selectedItems, selectedItemId, filterName);
  dispatch(setSelectedFilterItems({ selected: selectedFilterItems }));

  const query = getQueryString(selectedFilterItems);
  const vehicles = await getVehicles(modelId, query);

  const mappingDesebledFilterItems = {
    equipments: (items) => {
      const modificationsIdsForFilter = getIdsItemsFilter(items, 'modification');
      dispatch(setDisabledModificationFilterItems({ modificationsIdsForFilter }));
    },
    modifications: (items) => {
      const equipmentsIdsForFilter = getIdsItemsFilter(items, 'equipment');
      dispatch(setDisabledEquipmentFilterItems({ equipmentsIdsForFilter }));
    },
  };

  mappingDesebledFilterItems[filterName](vehicles.items);

  dispatch(fetchVehiclesSuccess({ vehicles }));
};
