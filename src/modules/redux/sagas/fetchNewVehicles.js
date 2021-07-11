import { call, put } from 'redux-saga/effects';
import { addNewVehicles, changeVehiclesLoader } from 'modules/redux/redusers/newVehiclesSlice';
import { addFilterItems } from 'modules/redux/redusers/filtersSlice';
import API from 'modules/api';
import CONST from 'modules/utils/const';
import {
  getLisFilterItems, getColorsListFilter, getMinPrice, getMaxPrice,
} from 'modules/utils';
import getVehicles from './vehicles';

export default function* fetchNewVehicles({ payload }) {
  try {
    const vehicles = yield call(getVehicles, payload.modelId, CONST.vehiclesTypes.newVehicles, '');
    const generalListColorsByModel = yield call(API.getModelColor, payload.modelId);

    const filterItems = {
      modelId: payload.modelId,
      modifications: getLisFilterItems(
        vehicles.items,
        CONST.vehicleProps.modification.prop,
        CONST.vehicleProps.modification.name,
      ),
      equipments: getLisFilterItems(
        vehicles.items,
        CONST.vehicleProps.equipment.prop,
        CONST.vehicleProps.equipment.name,
      ),
      colors: getColorsListFilter(vehicles.items, generalListColorsByModel),
      minPrice: getMinPrice(vehicles.items, 'price'),
      maxPrice: getMaxPrice(vehicles.items, 'price'),
    };

    yield put(addFilterItems({ filterItems }));
    yield put(addNewVehicles({ vehicles }));
    yield put(changeVehiclesLoader({ loading: false }));
  } catch (e) {
    console.log('newVehicles saga', e);
    throw e;
  }
}
