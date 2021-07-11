import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import dealersReduser from './dealersSlice';
import brandsReduser from './brandsSlice';
import modelsRedusers from './modelsSlice';
import newVehiclesReducer from './newVehiclesSlice';
import newVehicleReducer from './newVehicleSlice';
import tradeInVehiclesReducer from './tradeInVehiclesSlice';
import tradeInVehicleReducer from './tradeInVehicleSlice';
import allNewVehiclesReducer from './allNewVehiclesSlice';
import filtersReducer from './filtersSlice';

const redusers = combineReducers({
  dealers: dealersReduser,
  brands: brandsReduser,
  modelsPage: modelsRedusers,
  newVehiclesPage: newVehiclesReducer,
  newVehiclePage: newVehicleReducer,
  tradeInVehiclesPage: tradeInVehiclesReducer,
  tradeInVehiclePage: tradeInVehicleReducer,
  allNewVehiclesPage: allNewVehiclesReducer,
  filters: filtersReducer,
  form: formReducer,
});

export default redusers;
