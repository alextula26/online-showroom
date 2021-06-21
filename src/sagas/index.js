import { takeEvery } from 'redux-saga/effects';
import fetchBrands from './fetchBrands';
import fetchModels from './fetchModels';
import * as TYPES from '../actions/types';

export default function* sagaWatcher() {
  yield takeEvery(TYPES.REQUEST_BRANDS, fetchBrands);
  yield takeEvery(TYPES.REQUEST_MODELS, fetchModels);
}
