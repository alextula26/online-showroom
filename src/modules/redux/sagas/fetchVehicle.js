import { call, put } from 'redux-saga/effects';
import CONST from 'modules/utils/const';
import { addNewVehicle } from 'modules/redux/redusers/newVehicleSlice';
import { addTradeInVehicle } from 'modules/redux/redusers/tradeInVehicleSlice';
import API from 'modules/api';

export default function* fetchVehicle({ payload }) {
  const mappingTypeVehicles = {
    [CONST.vehiclesTypes.newVehicles]: (vehicle) => (
      put(addNewVehicle({ vehicle }))
    ),
    [CONST.vehiclesTypes.tradeInVehicles]: (vehicle) => (
      put(addTradeInVehicle({ vehicle }))
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
