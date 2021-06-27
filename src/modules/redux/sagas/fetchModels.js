import { call, put } from 'redux-saga/effects';
import * as actions from 'modules/redux/actions';
import API from 'modules/api';

export default function* fetchModels({ payload }) {
  try {
    const models = yield call(API.getModels, payload.brandId);
    yield put(actions.fetchModels({ models }));
    yield put(actions.changeModelsLoader({ loading: false }));
  } catch (e) {
    console.log(e);
    throw e;
  }
}
