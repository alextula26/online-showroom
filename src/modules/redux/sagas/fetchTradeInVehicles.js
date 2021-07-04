import { call, put } from 'redux-saga/effects';
import { addTradeInVehicles } from 'modules/redux/redusers/tradeInVehiclesSlice';
import CONST from 'modules/utils/const';
import getVehicles from './vehicles';

export default function* fetchTradeInVehicles() {
  try {
    const tradeInVehicles = yield call(getVehicles, null, CONST.vehiclesTypes.tradeInVehicles, '');
    yield put(addTradeInVehicles({ tradeInVehicles }));
  } catch (e) {
    console.log('newVehicles saga', e);
    throw e;
  }
}
