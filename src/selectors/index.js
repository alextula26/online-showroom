import { createSelector } from 'reselect';
import { isEmpty, includes } from '../utils';
// import { isEmpty, includes } from '../utils';

const getVisibleModels = (state) => state.modelsPage.models;

export const filteredModelsSelector = createSelector(
  getVisibleModels,
  (models) => models.filter((model) => !model.is_hidden),
);

const getVehicles = (state) => state.vehiclesPage.vehicles;
const getFilters = (state) => state.filters;

const getFiltersSelected = createSelector(
  getFilters,
  (filters) => {
    const filtersKeys = Object.keys(filters);
    return filtersKeys.reduce((acc, key) => {
      const selectedId = filters[key].items
        .filter(({ selected }) => selected)
        .map(({ id }) => id);
      return { ...acc, [key]: selectedId };
    }, {});
  },
);

/* const getSelectedModifications = (state) => state.filters.modifications.selected;
const getSelectedEquipments = (state) => state.filters.equipments.selected; */

export const getVehiclesSelector = createSelector(
  [getVehicles, getFiltersSelected],
  (
    vehicles,
    selectedEquipments,
  ) => {
    if (!isEmpty(vehicles)) {
      const filtersKeys = Object.keys(selectedEquipments);
      filtersKeys.reduce((acc, key) => {
        if (isEmpty(selectedEquipments[key])) {
          return acc;
        }

        console.log(key);
        console.log(selectedEquipments[key]);
        console.log(vehicles.items);
        const result = vehicles.items.filter((vehicle) => (
          includes(selectedEquipments, vehicle[key])));

        console.log(result);

        return acc;
      }, vehicles);
    }

    /* if (!isEmpty(selectedModifications)) {
      return {
        ...vehicles,
        items: vehicles.items.filter((vehicle) => (
          includes(selectedModifications, vehicle.modification))),
      };
    } */
    return vehicles;
  },
);

export const getB = () => true;
