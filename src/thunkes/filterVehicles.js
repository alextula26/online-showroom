import CONST from '../utils/const';
import * as actions from '../actions';
import getVehicles from './vehicles';
/* import {
  getQueryString, addSelectedFilterItem, getIdsFilterItems, getMinPrice, getMaxPrice,
} from '../utils'; */
import { getQueryString, getIdsFilterItems } from '../utils';

const filterNamesOfResponseProps = [
  [CONST.vehicleProps.modification.field, CONST.vehicleProps.modification.prop],
  [CONST.vehicleProps.equipment.field, CONST.vehicleProps.equipment.prop],
  [CONST.vehicleProps.color.field, CONST.vehicleProps.color.prop],
];

export default (options) => async (dispatch) => {
  const {
    selected, minPrice, maxPrice, modelId, status,
  } = options;

  const query = getQueryString(selected);

  try {
    const vehicles = await getVehicles(modelId, CONST.vehiclesTypes.newVehicles, query);

    const filterItemsIds = filterNamesOfResponseProps
      .filter(([field]) => field !== 'modifications')
      .reduce((acc, [field, prop]) => (
        { ...acc, [field]: getIdsFilterItems(vehicles.items, prop) }
      ), {});

    console.log('selected', selected);
    console.log('minPrice', minPrice);
    console.log('maxPrice', maxPrice);
    console.log('modelId', modelId);
    console.log('status', status);
    console.log('filterItemsIds', filterItemsIds);
    console.log('vehicles', vehicles);

    // const minPriceRange = minPrice ?? getMinPrice(vehicles.items, 'price');
    // const maxPriceRange = maxPrice ?? getMaxPrice(vehicles.items, 'price');
    dispatch(actions.changeFilterState({ stateFilter: CONST.filterState.filteringDisabled }));
    dispatch(actions.addFilterDisabledItems({ filterItemsIds }));
    dispatch(actions.fetchNewVehicles({ vehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
