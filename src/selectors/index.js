import { createSelector } from 'reselect';
import { isEmpty, getStatusId } from '../utils';

const getAllModels = (state) => state.modelsPage.models;

export const getVisibleModels = createSelector(
  getAllModels,
  (models) => models.filter((model) => !model.is_hidden),
);

const getAllVehicles = (state) => state.vehiclesPage.vehicles;
const minPriceOfVehicles = (state) => state.filters.minPrice;
const maxPriceOfVehicles = (state) => state.filters.maxPrice;
const getStatusOfVehicles = (state) => state.filters.status;

const getVehiclesByStatus = createSelector(
  [getAllVehicles, getStatusOfVehicles],
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
  [getVehiclesByStatus, minPriceOfVehicles, maxPriceOfVehicles],
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
