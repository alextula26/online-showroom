import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const tradeInVehiclesReducer = handleActions({
  [actions.fetchTradeInVehicles](state, { payload }) {
    return {
      ...state,
      tradeInVehicles: payload.tradeInVehicles,
    };
  },
}, { tradeInVehicles: {} });

export default tradeInVehiclesReducer;
