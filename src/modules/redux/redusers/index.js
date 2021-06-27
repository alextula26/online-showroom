import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dealersReduser from './dealersReduser';
import brandsReduser from './brandsReduser';
import filtersReducer from './filtersReducer';
import modelsRedusers from './modelsReduser';
import newVehiclesReducer from './newVehiclesReducer';
import newVehicleReducer from './newVehicleReducer';
import tradeInVehiclesReducer from './tradeInVehiclesReducer';
import tradeInVehicleReducer from './tradeInVehicleReducer';
import allNewVehiclesReducer from './allNewVehiclesReducer';

const redusers = combineReducers({
  dealers: dealersReduser,
  brands: brandsReduser,
  filters: filtersReducer,
  modelsPage: modelsRedusers,
  newVehiclesPage: newVehiclesReducer,
  newVehiclePage: newVehicleReducer,
  tradeInVehiclesPage: tradeInVehiclesReducer,
  tradeInVehiclePage: tradeInVehicleReducer,
  allNewVehiclesPage: allNewVehiclesReducer,
  form: formReducer,
});

export default redusers;
