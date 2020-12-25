import { createSelector } from 'reselect';
// import { isEmpty, includes } from '../utils';

const getVisibleModels = (state) => state.modelsPage.models;

export const filteredModelsSelector = createSelector(
  getVisibleModels,
  (models) => models.filter((model) => !model.is_hidden),
);

export const getB = () => true;
