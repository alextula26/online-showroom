import CONST from 'modules/utils/const';
import * as actions from 'modules/redux/actions';
import API from 'modules/api';

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
