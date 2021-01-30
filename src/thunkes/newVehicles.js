import CONST from '../utils/const';
import * as actions from '../actions';
import API from '../api';
import { getLisFilterItems, getColorsListFilter } from '../utils';
import getVehicles from './vehicles';

export default (modelId, typeVehicles, query) => async (dispatch) => {
  try {
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
    };

    dispatch(actions.setFilterItems({ filterItems }));
    dispatch(actions.fetchNewVehicles({ vehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
