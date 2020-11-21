import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import modelsRedusers from './modelsReduser';
import brandsReduser from './brandsReduser';
import dealersReduser from './dealersReduser';

const redusers = combineReducers({
  dealers: dealersReduser,
  brands: brandsReduser,
  models: modelsRedusers,
});

export default createStore(redusers, applyMiddleware(thunkMiddleware));
