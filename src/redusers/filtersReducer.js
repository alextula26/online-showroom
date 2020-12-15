import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const filtersReducer = handleActions({
  [actions.setModificationsForFilter](state, { payload: { modificationsForFilter } }) {
    return {
      ...state,
      modifications: modificationsForFilter,
    };
  },

  [actions.setEquipmentsForFilter](state, { payload: { equipmentsForFilter } }) {
    return {
      ...state,
      equipments: equipmentsForFilter,
    };
  },

  [actions.selectModification](state, { payload: { modificationId } }) {
    const { modifications } = state;
    return {
      ...state,
      modifications: modifications.map((item) => (
        item.id === Number(modificationId) ? { ...item, selected: !item.selected } : item)),
    };
  },

  [actions.selectEquipment](state, { payload: { equipmentId } }) {
    const { equipments } = state;
    return {
      ...state,
      equipments: equipments.map((item) => (
        item.id === Number(equipmentId) ? { ...item, selected: !item.selected } : item)),
    };
  },

}, {
  modifications: [],
  equipments: [],
});

export default filtersReducer;
