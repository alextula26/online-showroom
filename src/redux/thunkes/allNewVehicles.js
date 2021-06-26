import API from '../../api';
import getVehicles from './vehicles';
/* import CONST from '../utils/const';
import * as actions from '../actions';
import {
  getLisFilterItems, getColorsListFilter, getMinPrice, getMaxPrice,
} from '../utils';
 */

export default (brands, typeVehicles, query) => async () => {
  console.log('brands', brands);
  console.log('typeVehicles', typeVehicles);
  console.log('query', query);

  const modelsByBrands = brands
    .filter((brand) => brand.vehicles !== 0)
    .map(async (brand) => {
      const models = await API.getModels(brand.id);
      const modelsWithVehiclesIds = models.items
        .filter((model) => model.min_price > 0)
        .map((model) => model.id);
      return modelsWithVehiclesIds;
    });

  const promisesModelsByBrandsSettled = await Promise.allSettled(modelsByBrands);

  const modelIds = await promisesModelsByBrandsSettled
    .filter((item) => item.status === 'fulfilled')
    .reduce((acc, { value }) => [...acc, ...value], []);

  console.log('modelIds', modelIds);

  const vehiclesByModelIds = modelIds.map(async (id) => {
    const vehicles = await getVehicles(id, typeVehicles, query);
    return vehicles.items;
  });

  const promisesVehiclesByModelIdsSettled = await Promise.allSettled(vehiclesByModelIds);

  console.log('promisesVehiclesByModelIdsSettled', promisesVehiclesByModelIdsSettled);

  const vehicles = await promisesVehiclesByModelIdsSettled
    .filter((item) => item.status === 'fulfilled')
    .reduce((acc, { value }) => [...acc, ...value], []);

  console.log('vehicles', vehicles);

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
