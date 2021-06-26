import { call, put } from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../api';

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
