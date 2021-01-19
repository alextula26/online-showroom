import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { includes } from '../utils';

const filtersReducer = handleActions({
  [actions.setModificationsFilter](state, { payload: { modificationsForFilter } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        modifications: modificationsForFilter,
      },
    };
  },

  [actions.setEquipmentsFilter](state, { payload: { equipmentsForFilter } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        equipments: equipmentsForFilter,
      },
    };
  },

  [actions.setColorsFilter](state, { payload: { colorsForFilter } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        colors: colorsForFilter,
      },
    };
  },
  /*
  [actions.selectModificationsFilterItem](state, { payload: { modificationId } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        modifications: state.lists.modifications.map((item) => (
          item.id === modificationId ? { ...item, selected: !item.selected } : item)),
      },
    };
  },

  [actions.selectEquipmentsFilterItem](state, { payload: { equipmentId } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        equipments: state.lists.equipments.map((item) => (
          item.id === equipmentId ? { ...item, selected: !item.selected } : item)),
      },
    };
  },

  [actions.selectColorsFilterItem](state, { payload: { colorId } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        colors: state.lists.colors.map((item) => (
          item.id === colorId ? { ...item, selected: !item.selected } : item)),
      },
    };
  },
  */
  /* [actions.setSelectedFilterItems](state, { payload: { selected } }) {
    return {
      ...state,
      selected,
    };
  }, */

  /*
  [actions.setDisabledModificationFilterItems](state, { payload: { modificationsIdsForFilter } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        modifications: state.lists.modifications.map((item) => {
          if (includes(modificationsIdsForFilter, item.id)) {
            return { ...item, disabled: false };
          }

          return { ...item, disabled: true };
        }),
      },
    };
  },
  [actions.setDisabledEquipmentFilterItems](state, { payload: { equipmentsIdsForFilter } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        equipments: state.lists.equipments.map((item) => {
          if (includes(equipmentsIdsForFilter, item.id)) {
            return { ...item, disabled: false };
          }

          return { ...item, disabled: true };
        }),
      },
    };
  },
  [actions.setDisabledColorFilterItems](state, { payload: { colorsIdsForFilter } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        colors: state.lists.colors.map((item) => {
          if (includes(colorsIdsForFilter, item.id)) {
            return { ...item, disabled: false };
          }

          return { ...item, disabled: true };
        }),
      },
    };
  },
  */

  [actions.updateFilters](state, { payload: { filterName, selectedItemId, data } }) {
    const keys = Object.keys(data.disabledItems);

    const disabledFilter = keys.reduce((acc, key) => {
      const newFilters = state.lists[key].map((item) => {
        if (includes(data.disabledItems[key], item.id)) {
          return { ...item, disabled: false };
        }

        return { ...item, disabled: true };
      });

      return { ...acc, [key]: newFilters };
    }, {});

    return {
      ...state,
      lists: {
        ...state.lists,
        [filterName]: state.lists[filterName].map((item) => (
          item.id === selectedItemId ? { ...item, selected: !item.selected } : item)),
        ...disabledFilter,
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
});

export default filtersReducer;
