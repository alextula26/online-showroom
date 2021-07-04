import { call, put } from 'redux-saga/effects';
import { addhModels, changeModelsLoader } from 'modules/redux/redusers/modelsSlice';
import API from 'modules/api';

export default function* fetchModels({ payload }) {
  try {
    const models = yield call(API.getModels, payload.brandId);
    yield put(addhModels({ models }));
    yield put(changeModelsLoader({ loading: false }));
  } catch (e) {
    console.log(e);
    throw e;
  }
}
