import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import dealersReduser from './dealersReduser';
import brandsReduser from './brandsReduser';
import filtersReducer from './filtersReducer';
import modelsRedusers from './modelsReduser';
import newVehiclesReducer from './newVehiclesReducer';
import newVehicleReducer from './newVehicleReducer';
import tradeInVehiclesReducer from './tradeInVehiclesReducer';
import tradeInVehicleReducer from './tradeInVehicleReducer';

const redusers = combineReducers({
  dealers: dealersReduser,
  brands: brandsReduser,
  filters: filtersReducer,
  modelsPage: modelsRedusers,
  newVehiclesPage: newVehiclesReducer,
  newVehiclePage: newVehicleReducer,
  tradeInVehiclesPage: tradeInVehiclesReducer,
  tradeInVehiclePage: tradeInVehicleReducer,
  form: formReducer,
});

export default createStore(redusers, applyMiddleware(thunkMiddleware));
