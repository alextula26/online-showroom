import * as actions from '../actions';
import API from '../api';
import {
  getLisFilterItems, getQueryString, addSelectedFilterItem, getIdsFilterItems, getColorsListFilter,
} from '../utils';

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

const getNewVehicles = async (modelId, options) => {
  const vehicles = await API.getNewVehicles(modelId, options);
  const promisesVehicles = vehicles.items.map(async (vehicle) => {
    const { general } = await API.getNewVehicle(vehicle.id);
    return { ...vehicle, general };
  });

  const promisesVehiclesSettled = await Promise.allSettled(promisesVehicles);

  const items = promisesVehiclesSettled
    .filter((item) => item.status === 'fulfilled')
    .map(({ value }) => value);

  return { ...vehicles, items };
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
    const vehicle = await API.getNewVehicle(vehicleId);
    dispatch(actions.fetchNewVehicle({ vehicle }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchTradeInVehicles = () => async (dispatch) => {
  try {
    const tradeInVehicles = await API.getTradeInVehicles();
    dispatch(actions.fetchTradeInVehicles({ tradeInVehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
