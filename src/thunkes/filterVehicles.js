import CONST from '../utils/const';
import * as actions from '../actions';
import getVehicles from './vehicles';
import { getQueryString, addSelectedFilterItem, getIdsFilterItems } from '../utils';

const filterNamesOfResponseProps = [
  [CONST.vehicleProps.modification.field, CONST.vehicleProps.modification.prop],
  [CONST.vehicleProps.equipment.field, CONST.vehicleProps.equipment.prop],
  [CONST.vehicleProps.color.field, CONST.vehicleProps.color.prop],
];

export default (options) => async (dispatch) => {
  const {
    modelId, filterName, selectedItemId, selectedItems,
  } = options;

  const selectedFilterItems = addSelectedFilterItem(selectedItems, selectedItemId, filterName);
  const query = getQueryString(selectedFilterItems);

  try {
    const vehicles = await getVehicles(modelId, CONST.vehiclesTypes.newVehicles, query);

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