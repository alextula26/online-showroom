import { handleActions } from 'redux-actions';
import * as actions from 'modules/redux/actions';

const allNewVehiclesReducer = handleActions({
  [actions.fetchAllNewVehicles](state, { payload }) {
    return {
      ...state,
      allNewVehicles: payload.allNewVehicles,
    };
  },
}, { allNewVehicles: {} });

export default allNewVehiclesReducer;
