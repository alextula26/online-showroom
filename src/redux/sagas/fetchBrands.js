import { call, put } from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../api';

export default function* fetchBrands() {
  try {
    const brands = yield call(API.getBrands);
    yield put(actions.fetchBrands({ brands }));
  } catch (e) {
    console.log(e);
    throw e;
  }
}
