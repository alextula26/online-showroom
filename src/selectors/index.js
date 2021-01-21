import { createSelector } from 'reselect';
// import { isEmpty, includes } from '../utils';

const getAllModels = (state) => state.modelsPage.models;

export const getVisibleModels = createSelector(
  getAllModels,
  (models) => models.filter((model) => !model.is_hidden),
);

const getAllVehicles = (state) => state.vehiclesPage.vehicles;
const minPriceOfVehicles = (state) => state.filters.minPrice;
const maxPriceOfVehicles = (state) => state.filters.maxPrice;

export const getVehicles = createSelector(
  [getAllVehicles, minPriceOfVehicles, maxPriceOfVehicles],
  (vehicles, minPrice, maxPrice) => {
    console.log(minPrice);
    console.log(maxPrice);
    return vehicles;
  },
);
