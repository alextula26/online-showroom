import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const allNewVehiclesReducer = handleActions({
  [actions.fetchTradeInVehicles](state, { payload }) {
    return {
      ...state,
      allNewVehicles: payload.allNewVehicles,
    };
  },
}, { allNewVehicles: {} });

export default allNewVehiclesReducer;
