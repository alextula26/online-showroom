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

  [actions.setSelectedFilterItems](state, { payload: { selected } }) {
    return {
      ...state,
      selected,
    };
  },

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
