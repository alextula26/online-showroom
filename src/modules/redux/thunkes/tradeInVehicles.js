import * as actions from 'modules/redux/actions';
import getVehicles from './vehicles';

export default (modelId, typeVehicles, query) => async (dispatch) => {
  try {
    const tradeInVehicles = await getVehicles(modelId, typeVehicles, query);
    dispatch(actions.fetchTradeInVehicles({ tradeInVehicles }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
