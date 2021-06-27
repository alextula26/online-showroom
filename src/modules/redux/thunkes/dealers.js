import * as actions from 'modules/redux/actions';
import API from 'modules/api';

export default () => async (dispatch) => {
  try {
    const dealers = await API.getDealers();
    dispatch(actions.fetchDealers({ dealers }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
