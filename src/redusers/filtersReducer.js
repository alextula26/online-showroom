import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const filtersReducer = handleActions({
  [actions.selectModification](state, { payload: { modificationId } }) {
    const { modifications } = state;
    const { selected } = modifications;

    return {
      ...state,
      modifications: {
        ...modifications,
        selected: [...selected, Number(modificationId)],
      },
    };
  },
  [actions.unSelectModification](state, { payload: { modificationId } }) {
    const { modifications } = state;
    const { selected } = modifications;

    return {
      ...state,
      modifications: {
        ...modifications,
        selected: selected.filter((modification) => (
          modification !== Number(modificationId))),
      },
    };
  },
  [actions.selectEquipment](state, { payload: { equipmentId } }) {
    const { equipments } = state;
    const { selected } = equipments;

    return {
      ...state,
      equipments: {
        ...equipments,
        selected: [...selected, Number(equipmentId)],
      },
    };
  },
  [actions.unSelectEquipment](state, { payload: { equipmentId } }) {
    const { equipments } = state;
    const { selected } = equipments;

    return {
      ...state,
      equipments: {
        ...equipments,
        selected: selected.filter((equipment) => (
          equipment !== Number(equipmentId))),
      },
    };
  },
  [actions.setModificationsForFilter](state, { payload: { modificationsForFilter } }) {
    const { modifications } = state;

    return {
      ...state,
      modifications: {
        ...modifications,
        items: modificationsForFilter,
      },
    };
  },

  [actions.setEquipmentsForFilter](state, { payload: { equipmentsForFilter } }) {
    const { equipments } = state;

    return {
      ...state,
      equipments: {
        ...equipments,
        items: equipmentsForFilter,
      },
    };
  },

}, {
  modifications: { items: [], selected: [] },
  equipments: { items: [], selected: [] },
});

export default filtersReducer;
