import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { includes } from '../utils';

const filtersReducer = handleActions({
  [actions.setFilterItems](state, { payload: { filterItems } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        modifications: filterItems.modifications,
        equipments: filterItems.equipments,
        colors: filterItems.colors,
      },
    };
  },

  [actions.updateFilterItems](state, {
    payload: { filterName, selectedItemId, curentDisabledItems },
  }) {
    const nameDisabledItems = Object.keys(curentDisabledItems.disabledItems);

    const disabledFilterItems = nameDisabledItems.reduce((acc, name) => (
      {
        ...acc,
        [name]: state.lists[name].map((item) => (
          {
            ...item,
            disabled: !includes(curentDisabledItems.disabledItems[name], item.id),
          })),
      }), {});

    return {
      ...state,
      lists: {
        ...state.lists,
        [filterName]: state.lists[filterName].map((item) => (
          item.id === selectedItemId ? { ...item, selected: !item.selected } : item)),
        ...disabledFilterItems,
      },
      selected: {
        ...state.selected,
        [filterName]: includes(state.selected[filterName], selectedItemId)
          ? state.selected[filterName].filter((item) => item !== selectedItemId)
          : [...state.selected[filterName], selectedItemId],
      },
    };
  },

}, {
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
  minPrice: null,
  maxPrice: null,
  status: 'inStock', // all, inStock, onWay
});

export default filtersReducer;
