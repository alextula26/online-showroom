import * as actions from '../actions';
import API from '../api';
import {
  getLisFilterItems, getQueryString, addSelectedFilterItem, getIdsFilterItems, getColorsListFilter,
} from '../utils';

const getPromisesVehiclesSettled = async (promisesVehicles) => {
  const promisesVehiclesSettled = await Promise.allSettled(promisesVehicles);

  return promisesVehiclesSettled
    .filter((item) => item.status === 'fulfilled')
    .map(({ value }) => value);
};

const getNewVehicles = async (modelId) => {
  const vehicles = await API.getNewVehicles(modelId);
  const promisesVehicles = vehicles.items.map(async (vehicle) => {
    const { general } = await API.getVehicle(vehicle.id);
    return { ...vehicle, general };
  });

  const items = await getPromisesVehiclesSettled(promisesVehicles);

  return { ...vehicles, items };
};

const getTradeInVehicles = async () => {
  const vehicles = await API.getTradeInVehicles();
  const promisesVehicles = vehicles.items.map(async (vehicle) => {
    const { general, images } = await API.getVehicle(vehicle.id);
    return { ...vehicle, general, images };
  });

  const items = await getPromisesVehiclesSettled(promisesVehicles);

  return { ...vehicles, items };
};

export const fetchDealers = () => async (dispatch) => {
  try {
    const dealers = await API.getDealers();
    dispatch(actions.fetchDealers({ dealers }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchBrands = () => async (dispatch) => {
  try {
    const brands = await API.getBrands();
    dispatch(actions.fetchBrands({ brands }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchModels = (brandId) => async (dispatch) => {
  try {
    const models = await API.getModels(brandId);
    const { items, brand } = models;
    dispatch(actions.fetchModels({ items }));
    dispatch(actions.fetchBrandModels({ brand }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchNewVehicles = (modelId) => async (dispatch) => {
  try {
    const vehicles = await getNewVehicles(modelId);
    const generalListColorsByModel = await API.getModelColor(modelId);

    const filterItems = {
      modifications: getLisFilterItems(vehicles.items, 'modification', 'modification_name'),
      equipments: getLisFilterItems(vehicles.items, 'equipment', 'equipment_name'),
      colors: getColorsListFilter(vehicles.items, generalListColorsByModel),
    };

    dispatch(actions.setFilterItems({ filterItems }));
    dispatch(actions.fetchNewVehicles({ vehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchFilterVehicles = (options) => async (dispatch) => {
  const {
    modelId, filterName, selectedItemId, selectedItems,
  } = options;

  const filterNamesOfResponseProps = [
    ['modifications', 'modification'],
    ['equipments', 'equipment'],
    ['colors', 'color'],
  ];

  const selectedFilterItems = addSelectedFilterItem(selectedItems, selectedItemId, filterName);
  const query = getQueryString(selectedFilterItems);

  try {
    const vehicles = await getNewVehicles(modelId, query);

    const itemsForDisable = filterNamesOfResponseProps
      .filter(([name]) => name !== filterName)
      .reduce((acc, [name, prop]) => (
        { ...acc, [name]: getIdsFilterItems(vehicles.items, prop) }
      ), {});

    const curentDisabledItems = {
      currentItem: {
        [filterName]: selectedItemId,
      },
      disabledItems: {
        ...itemsForDisable,
      },
    };

    dispatch(actions.fetchNewVehicles({ vehicles }));
    dispatch(actions.updateFilterItems({ filterName, selectedItemId, curentDisabledItems }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchNewVehicle = (vehicleId) => async (dispatch) => {
  try {
    const vehicle = await API.getVehicle(vehicleId);
    dispatch(actions.fetchNewVehicle({ vehicle }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchTradeInVehicles = () => async (dispatch) => {
  try {
    const tradeInVehicles = await getTradeInVehicles();
    dispatch(actions.fetchTradeInVehicles({ tradeInVehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
