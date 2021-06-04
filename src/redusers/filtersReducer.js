import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { includes, getIdsFilterItems } from '../utils';
import CONST from '../utils/const';

const filtersReducer = handleActions({
  [actions.addFilterItems](state, { payload: { filterItems } }) {
    return {
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
    };
  },

  [actions.addSelectItemIdToSelected](state, { payload: { filterName, selectedItemId } }) {
    return {
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
    };
  },

  [actions.changeFilterState](state, { payload: { stateFilter } }) {
    console.log(stateFilter);
    return {
      ...state,
      stateFilter,
    };
  },

  [actions.addFilterPrice](state, { payload: { minPriceRange, maxPriceRange } }) {
    return {
      ...state,
      prices: {
        ...state.prices,
        minPriceRange,
        maxPriceRange,
      },
    };
  },

  [actions.addFilterDisabledItems](state, { payload: { vehicles, currentFilterfield } }) {
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
}, {
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
});

export default filtersReducer;
