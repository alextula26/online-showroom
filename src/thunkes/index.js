import * as actions from '../actions';
import API from '../api';
import {
  getLisFilterItems, getQueryString, addSelectedFilterItem, getIdsFilterItems, getColorsListFilter,
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

    const filterItems = {
      modifications: getLisFilterItems(vehicles.items, 'modification', 'modification_name'),
      equipments: getLisFilterItems(vehicles.items, 'equipment', 'equipment_name'),
      colors: getColorsListFilter(vehicles.items, generalListColorsByModel),
    };

    dispatch(actions.setFilterItems({ filterItems }));
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

  const filterNamesOfResponseProps = [
    ['modifications', 'modification'],
    ['equipments', 'equipment'],
    ['colors', 'color'],
  ];

  const selectedFilterItems = addSelectedFilterItem(selectedItems, selectedItemId, filterName);
  const query = getQueryString(selectedFilterItems);

  try {
    const vehicles = await getVehicles(modelId, query);

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

    dispatch(actions.fetchVehiclesSuccess({ vehicles }));
    dispatch(actions.updateFilterItems({ filterName, selectedItemId, curentDisabledItems }));
  } catch (e) {
    console.log(e);
    throw e;
  }
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
