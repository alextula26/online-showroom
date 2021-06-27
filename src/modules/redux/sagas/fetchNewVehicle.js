import { call, put } from 'redux-saga/effects';
import CONST from 'modules/utils/const';
import * as actions from 'modules/redux/actions';
import API from 'modules/api';

export default function* fetchNewVehicle({ payload }) {
  const mappingTypeVehicles = {
    [CONST.vehiclesTypes.newVehicles]: (vehicle) => (
      put(actions.fetchNewVehicle({ vehicle }))
    ),
    [CONST.vehiclesTypes.tradeInVehicles]: (vehicle) => (
      put(actions.fetchTradeInVehicle({ vehicle }))
    ),
  };

  try {
    const vehicle = yield call(API.getVehicle, payload.vehicleId);
    yield mappingTypeVehicles[payload.typeVehicles](vehicle);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
