import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const filtersReducer = handleActions({
  [actions.setModificationsForFilter](state, { payload: { modificationsForFilter } }) {
    return {
      ...state,
      modifications: {
        ...state.modifications,
        items: modificationsForFilter,
      },
    };
  },

  [actions.setEquipmentsForFilter](state, { payload: { equipmentsForFilter } }) {
    return {
      ...state,
      equipments: {
        ...state.equipments,
        items: equipmentsForFilter,
      },
    };
  },

  [actions.selectModification](state, { payload: { modificationId } }) {
    return {
      ...state,
      modifications: {
        ...state.modifications,
        items: state.modifications.items.map((item) => (
          item.id === modificationId ? { ...item, selected: !item.selected } : item)),
        selected: [...state.modifications.selected, modificationId],
      },
    };
  },

  [actions.selectEquipment](state, { payload: { equipmentId } }) {
    return {
      ...state,
      equipments: {
        ...state.equipments,
        items: state.equipments.items.map((item) => (
          item.id === equipmentId ? { ...item, selected: !item.selected } : item)),
        selected: [...state.equipments.selected, equipmentId],
      },
    };
  },

}, {
  modifications: {
    items: [],
    selected: [],
  },
  equipments: {
    items: [],
    selected: [],
  },
  colors: {
    items: [],
    selected: [],
  },
});

export default filtersReducer;
