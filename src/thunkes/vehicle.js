import CONST from '../utils/const';
import * as actions from '../actions';
import API from '../api';

export default (vehicleId, typeVehicles) => async (dispatch) => {
  const mappingTypeVehicles = {
    [CONST.vehiclesTypes.newVehicles]: (vehicle) => (
      dispatch(actions.fetchNewVehicle({ vehicle }))
    ),
    [CONST.vehiclesTypes.tradeInVehicles]: (vehicle) => (
      dispatch(actions.fetchTradeInVehicle({ vehicle }))
    ),
  };

  try {
    const vehicle = await API.getVehicle(vehicleId);
    mappingTypeVehicles[typeVehicles](vehicle);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
