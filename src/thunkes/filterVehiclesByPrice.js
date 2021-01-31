// import CONST from '../utils/const';
// import * as actions from '../actions';
// import getVehicles from './vehicles';

export default (options) => async () => {
  const { vehicles, minPrice, maxPrice } = options;

  const filteredVehiclesByPrice = vehicles.filter((vehicle) => (
    vehicle.price >= minPrice && vehicle.price <= maxPrice
  ));

  console.log('filteredVehiclesByPrice', filteredVehiclesByPrice);
  console.log('minPrice', minPrice);
  console.log('maxPrice', maxPrice);

  /* dispatch(actions.fetchNewVehicles({ vehicles }));
  dispatch(actions.setPrice({ minPrice, maxPrice })); */
};
