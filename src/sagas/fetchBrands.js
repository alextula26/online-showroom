import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import API from '../api';

const getBrands = async () => {
  const brands = await API.getBrands();
  return brands;
};

export default function* fetchBrands() {
  try {
    const brands = yield call(getBrands);
    yield put(actions.fetchBrands({ brands }));
  } catch (e) {
    console.log(e);
    throw e;
  }
}
