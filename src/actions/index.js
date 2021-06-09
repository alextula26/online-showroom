import { createAction } from 'redux-actions';

// Action creators for API requests
export const fetchDealers = createAction('FETCH_DEALERS');
export const fetchBrands = createAction('FETCH_BRANDS');
export const fetchModels = createAction('FETCH_MODELS');
export const fetchBrandModels = createAction('FETCH_BRAND_MODELS');
export const fetchNewVehicles = createAction('FETCH_NEW_VEHICLES');
export const fetchNewVehicle = createAction('FETCH_NEW_VEHICLE');
export const fetchTradeInVehicles = createAction('FETCH_TRADEIN_VEHICLES');
export const fetchTradeInVehicle = createAction('FETCH_TRADEIN_VEHICLE');
export const fetchAllNewVehicles = createAction('FETCH_ALL_NEW_VEHICLES');

// Action creators for filters
export const changeFilterState = createAction('CHANGE_FILTER_STATE');
export const addFilterItems = createAction('ADD_FILTER_ITEMS');
export const addSelectItemIdToSelected = createAction('ADD_SELECT_ITEM_ID_TO_SELECTED');
export const addFilterDisabledItems = createAction('ADD_FILTERDISABLED_ITEMS');
export const addFilterPrice = createAction('ADD_FILTER_PRICE');

// Action creators for loaders
export const changeModelsLoader = createAction('CHANGE_MODELS_LOADER');
