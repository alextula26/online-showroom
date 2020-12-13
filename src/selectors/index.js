import { createSelector } from 'reselect';
import { isEmpty, includes } from '../utils';

const getVisibleModels = (state) => state.modelsPage.models;

export const filteredModelsSelector = createSelector(
  getVisibleModels,
  (models) => models.filter((model) => !model.is_hidden),
);

const getVehicles = (state) => state.vehiclesPage.vehicles;
const getSelectedModifications = (state) => state.filters.modifications.selected;

export const getVehiclesSelector = createSelector(
  [getVehicles, getSelectedModifications],
  (vehicles, selectedModifications) => {
    console.log('vehicles', vehicles);
    console.log('selectedModifications', selectedModifications);
    if (!isEmpty(selectedModifications)) {
      const result = vehicles
        .items.filter((vehicle) => includes(selectedModifications, vehicle.modification));
      console.log(result);
      return {
        ...vehicles,
        items: result,
      };
    }

    return vehicles;
  },
);

export const getB = () => true;
