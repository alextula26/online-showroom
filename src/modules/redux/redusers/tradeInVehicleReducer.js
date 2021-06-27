import { handleActions } from 'redux-actions';
import * as actions from 'modules/redux/actions';

const tradeInVehicleReducer = handleActions({
  [actions.fetchTradeInVehicle](state, { payload }) {
    return {
      ...state,
      vehicle: payload.vehicle,
    };
  },
}, { vehicle: {} });

export default tradeInVehicleReducer;
