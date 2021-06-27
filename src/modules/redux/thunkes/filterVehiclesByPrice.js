// import CONST from '../utils/const';
import * as actions from 'modules/redux/actions';
// import getVehicles from './vehicles';

export default (options) => async (dispatch) => {
  const { minPriceRange, maxPriceRange } = options;

  console.log('minPrice', minPriceRange);
  console.log('maxPrice', maxPriceRange);

  /* dispatch(actions.fetchNewVehicles({ vehicles })); */
  dispatch(actions.setFilterPrice({ minPriceRange, maxPriceRange }));
};
