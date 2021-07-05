import { createSelector } from 'reselect';
import { isEmpty, getStatusId } from '../utils';

const getAllBrands = (state) => state.brands.brands;
const getVisibleBrands = createSelector(
  getAllBrands,
  (brands) => brands.filter((brand) => brand.vehicles > 0),
);

const getAllModels = (state) => state.modelsPage.models;
const getVisibleModels = createSelector(
  getAllModels,
  (models) => models.filter((model) => !model.is_hidden),
);

const getBrandByVehicles = (state) => state.newVehiclesPage.brand;
const getModelByVehicles = (state) => state.newVehiclesPage.model;
const getAllNewVehiclesByModel = (state) => state.newVehiclesPage.vehicles;
const getAllTradeInVehiclesByModel = (state) => state.tradeInVehiclesPage.tradeInVehicles;

const getModelsLoading = (state) => state.modelsPage.loading;
const getVehiclesLoading = (state) => state.newVehiclesPage.loading;
const getTradeInVehiclesLoading = (state) => state.tradeInVehiclesPage.loading;

export const getModelsContainerData = createSelector(
  [
    getVisibleBrands,
    getVisibleModels,
    getModelsLoading,
  ],
  (brands, models, loading) => ({ brand: brands[0], models, loading }),
);

export const getVehiclesContainerData = createSelector(
  [
    getBrandByVehicles,
    getModelByVehicles,
    getAllNewVehiclesByModel,
    getVehiclesLoading,
  ],
  (brand, model, vehicles, loading) => ({
    brand, model, vehicles, loading,
  }),
);

export const getTradeInVehiclesContainerData = createSelector(
  [
    getAllTradeInVehiclesByModel,
    getTradeInVehiclesLoading,
  ],
  (tradeInVehicles, loading) => ({
    vehicles: tradeInVehicles, loading,
  }),
);

// const getAllVehiclesByModel = (state) => state.newVehiclesPage.vehicles;

const getAllNewVehicles = (state) => state.newVehiclesPage.vehicles;
const minPriceOfVehicles = (state) => state.filters.minPrice;
const maxPriceOfVehicles = (state) => state.filters.maxPrice;
const getStatusOfVehicles = (state) => state.filters.status;

const getNewVehiclesByStatus = createSelector(
  [getAllNewVehicles, getStatusOfVehicles],
  (vehicles, status) => {
    if (isEmpty(vehicles.items)) {
      return {};
    }

    return getStatusId(status) === 0
      ? vehicles
      : {
        ...vehicles,
        items: vehicles.items.filter((vehicle) => getStatusId(status) === vehicle.status.id),
      };
  },
);

export const getVehicles = createSelector(
  [getNewVehiclesByStatus, minPriceOfVehicles, maxPriceOfVehicles],
  (vehicles, minPrice, maxPrice) => {
    if (isEmpty(vehicles.items)) {
      return {};
    }

    if (!minPrice || !maxPrice) {
      return vehicles;
    }

    return {
      ...vehicles,
      items: vehicles.items.filter(({ price }) => price >= minPrice && price <= maxPrice),
    };
  },
);
