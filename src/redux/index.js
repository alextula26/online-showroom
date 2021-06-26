import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import redusers from './redusers';
import sagaWatcher from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(redusers, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(sagaWatcher);

export default store;
