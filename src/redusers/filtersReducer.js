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
          item.id === Number(modificationId) ? { ...item, selected: !item.selected } : item)),
      },
    };
  },

  [actions.selectEquipment](state, { payload: { equipmentId } }) {
    return {
      ...state,
      equipments: {
        ...state.equipments,
        items: state.equipments.items.map((item) => (
          item.id === Number(equipmentId) ? { ...item, selected: !item.selected } : item)),
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
});

export default filtersReducer;
