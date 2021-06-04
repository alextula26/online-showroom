import CONST from '../utils/const';
import * as actions from '../actions';
import getVehicles from './vehicles';
/* import {
  getQueryString, addSelectedFilterItem, getIdsFilterItems, getMinPrice, getMaxPrice,
} from '../utils'; */
import { getQueryString } from '../utils';

export default (options) => async (dispatch) => {
  const {
    selected, minPrice, maxPrice, modelId, status, currentFilterfield,
  } = options;

  const query = getQueryString(selected);

  try {
    const vehicles = await getVehicles(modelId, CONST.vehiclesTypes.newVehicles, query);

    console.log('selected', selected);
    console.log('minPrice', minPrice);
    console.log('maxPrice', maxPrice);
    console.log('modelId', modelId);
    console.log('status', status);
    console.log('currentFilterfield', currentFilterfield);
    console.log('vehicles', vehicles);

    // const minPriceRange = minPrice ?? getMinPrice(vehicles.items, 'price');
    // const maxPriceRange = maxPrice ?? getMaxPrice(vehicles.items, 'price');
    dispatch(actions.changeFilterState({ stateFilter: CONST.filterState.filteringDisabled }));
    dispatch(actions.addFilterDisabledItems({ vehicles, currentFilterfield }));
    dispatch(actions.fetchNewVehicles({ vehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
