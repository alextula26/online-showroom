import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import modelsRedusers from './modelsReduser';
import brandsReduser from './brandsReduser';

const redusers = combineReducers({
  brands: brandsReduser,
  models: modelsRedusers,
});

export default createStore(redusers, applyMiddleware(thunkMiddleware));
