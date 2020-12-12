import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const vehiclesReducer = handleActions({
  [actions.fetchVehiclesSuccess](state, { payload }) {
    return {
      ...state,
      vehicles: payload.vehicles,
    };
  },
  [actions.fetchCharacteristicsSuccess](state, { payload }) {
    return {
      ...state,
      characteristics: payload.characteristics,
    };
  },
}, { vehicles: {}, characteristics: {} });

export default vehiclesReducer;
