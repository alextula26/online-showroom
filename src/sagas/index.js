import { takeEvery } from 'redux-saga/effects';
import fetchBrands from './fetchBrands';
import fetchModels from './fetchModels';
import fetchNewVehicles from './fetchNewVehicles';
import * as TYPES from '../actions/types';

export default function* sagaWatcher() {
  yield takeEvery(TYPES.REQUEST_BRANDS, fetchBrands);
  yield takeEvery(TYPES.REQUEST_MODELS, fetchModels);
  yield takeEvery(TYPES.REQUEST_NEW_VEHICLES, fetchNewVehicles);
}
