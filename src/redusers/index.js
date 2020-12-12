import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import dealersReduser from './dealersReduser';
import brandsReduser from './brandsReduser';
import filtersReducer from './filtersReducer';
import modelsRedusers from './modelsReduser';
import vehiclesReducer from './vehiclesReducer';
import vehicleReducer from './vehicleReducer';

const redusers = combineReducers({
  dealers: dealersReduser,
  brands: brandsReduser,
  filters: filtersReducer,
  modelsPage: modelsRedusers,
  vehiclesPage: vehiclesReducer,
  vehiclePage: vehicleReducer,
  form: formReducer,
});

export default createStore(redusers, applyMiddleware(thunkMiddleware));
