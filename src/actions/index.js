import { createAction } from 'redux-actions';

// Action creators for API requests
export const fetchDealersSuccess = createAction('DEALERS_FETCH_SUCCESS');
export const fetchBrandsSuccess = createAction('BRANDS_FETCH_SUCCESS');
export const fetchModelsSuccess = createAction('MODELS_FETCH_SUCCESS');
export const fetchBrandModelsSuccess = createAction('BRAND_MODELS_FETCH_SUCCESS');
export const fetchVehiclesSuccess = createAction('FETCH_VEHICLES');
export const fetchCharacteristicsSuccess = createAction('FETCH_CHARACTERISTICS');
export const fetchVehicleSuccess = createAction('FETCH_VEHICLE');

// Action creators for filters

// Выбрать пункт фильтра
export const selectModificationsFilterItem = createAction('SELECT_MODIFICATIONS_FILTER_ITEM');
export const selectEquipmentsFilterItem = createAction('SELECT_EQUIPMENTS_FILTER_ITEM');
export const selectColorsFilterItem = createAction('SELECT_COLORS_FILTER_ITEM');

// Первичное заполнение фильтров
export const setModificationsFilter = createAction('SET_MODIFICATIONS_FILTER');
export const setEquipmentsFilter = createAction('SET_EQUIPMENTS_FILTER');
export const setColorsFilter = createAction('SET_COLORS_FILTER');

export const setSelectedFilterItems = createAction('SET_SELECTED_FILTER_ITEMS');
export const setDisabledModificationFilterItems = createAction('SET_DISABLED_MODIFICATION_FILTER_ITEMS');
export const setDisabledEquipmentFilterItems = createAction('SET_DISABLED_EQUIPMENT_FILTER_ITEMS');
export const setDisabledColorFilterItems = createAction('SET_DISABLED_COLOR_FILTER_ITEMS');
