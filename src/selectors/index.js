import { createSelector } from 'reselect';
import { isEmpty, includes } from '../utils';

const getVisibleModels = (state) => state.modelsPage.models;

export const filteredModelsSelector = createSelector(
  getVisibleModels,
  (models) => models.filter((model) => !model.is_hidden),
);

const getVehicles = (state) => state.vehiclesPage.vehicles;
const getSelectedModifications = (state) => state.filters.modifications.selected;
const getSelectedEquipments = (state) => state.filters.equipments.selected;

export const getVehiclesSelector = createSelector(
  [getVehicles, getSelectedModifications, getSelectedEquipments],
  (
    vehicles,
    selectedModifications,
    // selectedEquipments,
  ) => {
    // console.log(selectedEquipments);

    if (!isEmpty(selectedModifications)) {
      return {
        ...vehicles,
        items: vehicles.items.filter((vehicle) => (
          includes(selectedModifications, vehicle.modification))),
      };
    }

    return vehicles;
  },
);

export const getB = () => true;
