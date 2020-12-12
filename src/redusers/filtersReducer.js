import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const filtersReducer = handleActions({
  [actions.addModifications](state, { payload }) {
    return {
      ...state,
      modifications: payload.modifications,
    };
  },
  [actions.addEquipments](state, { payload }) {
    return {
      ...state,
      equipments: payload.equipments,
    };
  },
}, { modifications: [243145, 243148], equipments: [14732] });

export default filtersReducer;
