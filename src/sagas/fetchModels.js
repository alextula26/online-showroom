import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import API from '../api';

const getModels = async (brandId) => {
  const models = await API.getModels(brandId);
  return models;
};

export default function* fetchModels(action) {
  try {
    const models = yield call(getModels, action.payload);
    yield put(actions.fetchModels({ models }));
    yield put(actions.changeModelsLoader({ loading: false }));
  } catch (e) {
    console.log(e);
    throw e;
  }
}
