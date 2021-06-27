import * as actions from 'modules/redux/actions';
import CONST from 'modules/utils/const';
import {
  getQueryString,
  // getMinPrice,
  // getMaxPrice
} from 'modules/utils';
import getVehicles from './vehicles';

export default (options) => async (dispatch) => {
  const {
    selected,
    minPrice,
    maxPrice,
    modelId,
    status,
    currentFilterfield,
  } = options;

  const query = getQueryString(selected);

  try {
    const newVehiclesResponse = await getVehicles(modelId, CONST.vehiclesTypes.newVehicles, query);

    const {
      brand, items, model, ...rest
    } = newVehiclesResponse;

    const newVehicles = items.filter(({ price }) => (
      price >= minPrice && price <= maxPrice));

    const vehicles = {
      brand, items: newVehicles, model, ...rest,
    };

    // const minPriceRange = getMinPrice(vehicles.items, 'price');
    // const maxPriceRange = getMaxPrice(vehicles.items, 'price');

    console.log('selected', selected);
    console.log('minPriceRange', minPrice);
    console.log('maxPriceRange', maxPrice);
    console.log('modelId', modelId);
    console.log('status', status);
    console.log('currentFilterfield', currentFilterfield);
    console.log('vehicles', vehicles);

    dispatch(actions.changeFilterState({ stateFilter: CONST.filterState.filtered }));

    if (currentFilterfield) {
      dispatch(actions.addFilterDisabledItems({ vehicles, currentFilterfield }));
    }

    dispatch(actions.addFilterPrice({ minPriceRange: minPrice, maxPriceRange: maxPrice }));
    dispatch(actions.fetchNewVehicles({ vehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
