import { takeEvery } from 'redux-saga/effects';
import * as TYPES from 'modules/redux/actions/types';
import fetchBrands from './fetchBrands';
import fetchModels from './fetchModels';
import fetchNewVehicles from './fetchNewVehicles';
import fetchNewVehicle from './fetchNewVehicle';

export default function* sagaWatcher() {
  yield takeEvery(TYPES.REQUEST_BRANDS, fetchBrands);
  yield takeEvery(TYPES.REQUEST_MODELS, fetchModels);
  yield takeEvery(TYPES.REQUEST_NEW_VEHICLES, fetchNewVehicles);
  yield takeEvery(TYPES.REQUEST_NEW_VEHICLE, fetchNewVehicle);
}
