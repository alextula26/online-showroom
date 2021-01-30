import * as actions from '../actions';
import API from '../api';

export default (vehicleId) => async (dispatch) => {
  try {
    const vehicle = await API.getVehicle(vehicleId);
    dispatch(actions.fetchNewVehicle({ vehicle }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
