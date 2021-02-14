/* import CONST from '../utils/const';
import API from '../api';
import * as actions from '../actions';
import {
  getLisFilterItems, getColorsListFilter, getMinPrice, getMaxPrice,
} from '../utils';
import getVehicles from './vehicles'; */

export default (brands, typeVehicles, query) => async () => {
  console.log('brands', brands);
  console.log('typeVehicles', typeVehicles);
  console.log('query', query);
  /* try {
    const vehicles = await getVehicles(modelId, typeVehicles, query);
    const generalListColorsByModel = await API.getModelColor(modelId);

    const filterItems = {
      modifications: getLisFilterItems(
        vehicles.items,
        CONST.vehicleProps.modification.prop,
        CONST.vehicleProps.modification.name,
      ),
      equipments: getLisFilterItems(
        vehicles.items,
        CONST.vehicleProps.equipment.prop,
        CONST.vehicleProps.equipment.name,
      ),
      colors: getColorsListFilter(vehicles.items, generalListColorsByModel),
      minPrice: getMinPrice(vehicles.items, 'price'),
      maxPrice: getMaxPrice(vehicles.items, 'price'),
    };

    dispatch(actions.setFilterItems({ filterItems }));
    dispatch(actions.fetchNewVehicles({ vehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  } */
};
