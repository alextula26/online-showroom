import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducer from 'modules/redux/redusers';
import sagaWatcher from 'modules/redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false })
    .concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(sagaWatcher);

export default store;
