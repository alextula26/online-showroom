import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import modelsRedusers from './modelsReduser';
import brandsReduser from './brandsReduser';
import dealersReduser from './dealersReduser';
import vehiclesReducer from './vehiclesReducer';
import vehicleReducer from './vehicleReducer';

const redusers = combineReducers({
  dealers: dealersReduser,
  brands: brandsReduser,
  modelsPage: modelsRedusers,
  vehiclesPage: vehiclesReducer,
  vehiclePage: vehicleReducer,
});

export default createStore(redusers, applyMiddleware(thunkMiddleware));
