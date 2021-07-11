import { createSlice } from '@reduxjs/toolkit';
import { includes, getIdsFilterItems } from 'modules/utils';
import CONST from 'modules/utils/const';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    stateFilter: CONST.filterState.filtered,
    currentFilterfield: null,
    lists: {
      modifications: [],
      equipments: [],
      colors: [],
    },
    selected: {
      modifications: [],
      equipments: [],
      colors: [],
    },
    prices: {
      minPrice: null,
      maxPrice: null,
      minPriceRange: null,
      maxPriceRange: null,
    },
    modelId: null,
    status: 'all', // all, inStock, onWay
  },
  reducers: {
    addFilterItems: (state, { payload: { filterItems } }) => ({
      ...state,
      lists: {
        ...state.lists,
        modifications: filterItems.modifications,
        equipments: filterItems.equipments,
        colors: filterItems.colors,
      },
      prices: {
        ...state.prices,
        minPrice: filterItems.minPrice,
        maxPrice: filterItems.maxPrice,
        minPriceRange: filterItems.minPrice,
        maxPriceRange: filterItems.maxPrice,
      },
      modelId: filterItems.modelId,
    }),

    addSelectItemIdToSelected: (state, { payload: { filterName, selectedItemId } }) => ({
      ...state,
      currentFilterfield: filterName,
      lists: {
        ...state.lists,
        [filterName]: state.lists[filterName].map((item) => (
          item.id === selectedItemId ? { ...item, selected: !item.selected } : item
        )),
      },
      selected: {
        ...state.selected,
        [filterName]: includes(state.selected[filterName], selectedItemId)
          ? state.selected[filterName].filter((item) => item !== selectedItemId)
          : [...state.selected[filterName], selectedItemId],
      },
    }),

    changeFilterState: (state, { payload: { stateFilter } }) => ({
      ...state,
      stateFilter,
    }),

    addFilterPrice: (state, { payload: { minPriceRange, maxPriceRange } }) => ({
      ...state,
      prices: {
        ...state.prices,
        minPriceRange,
        maxPriceRange,
      },
    }),

    addFilterDisabledItems: (state, { payload: { vehicles, currentFilterfield } }) => {
      const filterNamesOfResponseProps = [
        [CONST.vehicleProps.modification.field, CONST.vehicleProps.modification.prop],
        [CONST.vehicleProps.equipment.field, CONST.vehicleProps.equipment.prop],
        [CONST.vehicleProps.color.field, CONST.vehicleProps.color.prop],
      ];

      const filterItemsIds = filterNamesOfResponseProps
        .filter(([field]) => field !== currentFilterfield)
        .reduce((acc, [field, prop]) => (
          { ...acc, [field]: getIdsFilterItems(vehicles.items, prop) }
        ), {});

      const namefilterItems = Object.keys(filterItemsIds);

      const disabledFilterItems = namefilterItems.reduce((acc, name) => ({
        ...acc,
        [name]: state.lists[name].map((item) => (
          {
            ...item,
            disabled: !includes(filterItemsIds[name], item.id),
          })),
      }), {});

      return {
        ...state,
        lists: {
          ...state.lists,
          ...disabledFilterItems,
        },
      };
    },
  },
});

export const {
  addFilterItems,
  addSelectItemIdToSelected,
  changeFilterState,
  addFilterPrice,
  addFilterDisabledItems,
} = filtersSlice.actions;

export default filtersSlice.reducer;
