import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const filtersReducer = handleActions({
  [actions.setCheckModification](state, { payload: { modificationId } }) {
    const { modifications } = state;
    const { checks } = modifications;

    return {
      ...state,
      modifications: {
        ...modifications,
        checks: [...checks, Number(modificationId)],
      },
    };
  },
  [actions.removeCheckModification](state, { payload: { modificationId } }) {
    const { modifications } = state;
    const { checks } = modifications;

    return {
      ...state,
      modifications: {
        ...modifications,
        checks: checks.filter((modification) => (
          modification !== Number(modificationId))),
      },
    };
  },
  [actions.setCheckEquipment](state, { payload: { equipmentId } }) {
    const { equipments } = state;
    const { checks } = equipments;

    return {
      ...state,
      equipments: {
        ...equipments,
        checks: [...checks, Number(equipmentId)],
      },
    };
  },
  [actions.removeCheckEquipment](state, { payload: { equipmentId } }) {
    const { equipments } = state;
    const { checks } = equipments;

    return {
      ...state,
      equipments: {
        ...equipments,
        checks: checks.filter((equipment) => (
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
  modifications: { items: [], checks: [] },
  equipments: { items: [], checks: [] },
});

export default filtersReducer;
