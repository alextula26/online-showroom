import { takeEvery } from 'redux-saga/effects';
import fetchBrands from './fetchBrands';

export function* hello() {
  yield console.log('hello saga');
}

export function* sagaWatcher() {
  yield takeEvery('REQUEST_BRANDS', fetchBrands);
  yield takeEvery('HELLO_SAGA', hello);
}
