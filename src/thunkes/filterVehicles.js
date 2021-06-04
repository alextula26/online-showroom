import CONST from '../utils/const';
import * as actions from '../actions';
import getVehicles from './vehicles';
import { getQueryString, getMinPrice, getMaxPrice } from '../utils';

export default (options) => async (dispatch) => {
  const {
    selected, minPrice, maxPrice, modelId, status, currentFilterfield,
  } = options;

  const query = getQueryString(selected);

  try {
    const vehicles = await getVehicles(modelId, CONST.vehiclesTypes.newVehicles, query);
    const minPriceRange = getMinPrice(vehicles.items, 'price');
    const maxPriceRange = getMaxPrice(vehicles.items, 'price');

    console.log('selected', selected);
    console.log('minPrice', minPrice, 'minPriceRange', minPriceRange);
    console.log('maxPrice', maxPrice, 'maxPriceRange', maxPriceRange);
    console.log('modelId', modelId);
    console.log('status', status);
    console.log('currentFilterfield', currentFilterfield);
    console.log('vehicles', vehicles);

    dispatch(actions.changeFilterState({ stateFilter: CONST.filterState.filtered }));
    dispatch(actions.addFilterDisabledItems({ vehicles, currentFilterfield }));
    dispatch(actions.addFilterPrice({ minPriceRange, maxPriceRange }));
    dispatch(actions.fetchNewVehicles({ vehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
