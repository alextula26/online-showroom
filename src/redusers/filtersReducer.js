import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const filtersReducer = handleActions({
  [actions.setModificationsForFilter](state, { payload: { modificationsForFilter } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        modifications: modificationsForFilter,
      },
    };
  },

  [actions.setEquipmentsForFilter](state, { payload: { equipmentsForFilter } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        equipments: equipmentsForFilter,
      },
    };
  },

  [actions.selectModification](state, { payload: { modificationId } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        modifications: state.lists.modifications.map((item) => (
          item.id === modificationId ? { ...item, selected: !item.selected } : item)),
      },
    };
  },

  [actions.selectEquipment](state, { payload: { equipmentId } }) {
    return {
      ...state,
      lists: {
        ...state.lists,
        equipments: state.lists.equipments.map((item) => (
          item.id === equipmentId ? { ...item, selected: !item.selected } : item)),
      },
    };
  },

  [actions.setSelected](state, { payload: { selected } }) {
    return {
      ...state,
      selected,
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
