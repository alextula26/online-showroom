// import _ from 'lodash';
import * as actions from '../actions';
import API from '../api';
import {
  getLisFilterItems, getQueryString, addSelectedFilterItem, getIdsItemsFilter, getColorsListFilter,
} from '../utils';

export const fetchDealers = () => async (dispatch) => {
  try {
    const dealers = await API.getDealers();
    dispatch(actions.fetchDealersSuccess({ dealers }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchBrands = () => async (dispatch) => {
  try {
    const brands = await API.getBrands();
    dispatch(actions.fetchBrandsSuccess({ brands }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchModels = (brandId) => async (dispatch) => {
  try {
    const models = await API.getModels(brandId);
    const { items, brand } = models;
    dispatch(actions.fetchModelsSuccess({ items }));
    dispatch(actions.fetchBrandModelsSuccess({ brand }));
  } catch (e) {
    console.log(e);
    throw e;
  }
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
  try {
    const vehicles = await getVehicles(modelId);
    const generalListColorsByModel = await API.getModelColor(modelId);

    const modificationsForFilter = getLisFilterItems(vehicles.items, 'modification', 'modification_name');
    const equipmentsForFilter = getLisFilterItems(vehicles.items, 'equipment', 'equipment_name');
    const colorsForFilter = getColorsListFilter(vehicles.items, generalListColorsByModel);

    dispatch(actions.setModificationsFilter({ modificationsForFilter }));
    dispatch(actions.setEquipmentsFilter({ equipmentsForFilter }));
    dispatch(actions.setColorsFilter({ colorsForFilter }));

    dispatch(actions.fetchVehiclesSuccess({ vehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchFilterVehicles = (options) => async (dispatch) => {
  const {
    modelId, filterName, selectedItemId, selectedItems,
  } = options;

  const selectedFilterItems = addSelectedFilterItem(selectedItems, selectedItemId, filterName);
  dispatch(actions.setSelectedFilterItems({ selected: selectedFilterItems }));

  const query = getQueryString(selectedFilterItems);
  const vehicles = await getVehicles(modelId, query);

  const mappingDesebledFilterItems = {
    equipments: (items) => {
      const modificationsIdsForFilter = getIdsItemsFilter(items, 'modification');
      const colorsIdsForFilter = getIdsItemsFilter(items, 'color');
      dispatch(actions.setDisabledModificationFilterItems({ modificationsIdsForFilter }));
      dispatch(actions.setDisabledColorFilterItems({ colorsIdsForFilter }));
    },
    modifications: (items) => {
      const equipmentsIdsForFilter = getIdsItemsFilter(items, 'equipment');
      const colorsIdsForFilter = getIdsItemsFilter(items, 'color');
      dispatch(actions.setDisabledEquipmentFilterItems({ equipmentsIdsForFilter }));
      dispatch(actions.setDisabledColorFilterItems({ colorsIdsForFilter }));
    },
    colors: (items) => {
      const modificationsIdsForFilter = getIdsItemsFilter(items, 'modification');
      const equipmentsIdsForFilter = getIdsItemsFilter(items, 'equipment');
      dispatch(actions.setDisabledModificationFilterItems({ modificationsIdsForFilter }));
      dispatch(actions.setDisabledEquipmentFilterItems({ equipmentsIdsForFilter }));
    },
  };

  mappingDesebledFilterItems[filterName](vehicles.items);

  dispatch(actions.fetchVehiclesSuccess({ vehicles }));
};

export const fetchVehicle = (vehicleId) => async (dispatch) => {
  try {
    const vehicle = await API.getVehicle(vehicleId);
    dispatch(actions.fetchVehicleSuccess({ vehicle }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
