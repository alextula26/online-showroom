import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const filtersReducer = handleActions({
  [actions.setModification](state, { payload: { modificationId } }) {
    return {
      ...state,
      modifications: [...state.modifications, Number(modificationId)],
    };
  },
  [actions.removeModification](state, { payload: { modificationId } }) {
    return {
      ...state,
      modifications: state.modifications.filter((modification) => (
        modification !== Number(modificationId))),
    };
  },
  [actions.setEquipment](state, { payload: { equipmentId } }) {
    return {
      ...state,
      equipments: [...state.equipments, Number(equipmentId)],
    };
  },
  [actions.removeEquipment](state, { payload: { equipmentId } }) {
    return {
      ...state,
      equipments: state.equipments.filter((equipment) => (
        equipment !== Number(equipmentId))),
    };
  },
}, { modifications: [], equipments: [] });

export default filtersReducer;
