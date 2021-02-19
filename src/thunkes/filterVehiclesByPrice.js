// import CONST from '../utils/const';
import * as actions from '../actions';
// import getVehicles from './vehicles';

export default (options) => async (dispatch) => {
  const { vehicles, minPriceRange, maxPriceRange } = options;

  const filteredVehiclesByPrice = vehicles.filter((vehicle) => (
    vehicle.price >= minPriceRange && vehicle.price <= maxPriceRange
  ));

  console.log('filteredVehiclesByPrice', filteredVehiclesByPrice);
  console.log('minPrice', minPriceRange);
  console.log('maxPrice', maxPriceRange);

  /* dispatch(actions.fetchNewVehicles({ vehicles })); */
  dispatch(actions.setFilterPrice({ minPriceRange, maxPriceRange }));
};
