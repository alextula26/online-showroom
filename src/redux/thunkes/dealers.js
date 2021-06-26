import * as actions from '../../actions';
import API from '../../api';

export default () => async (dispatch) => {
  try {
    const dealers = await API.getDealers();
    dispatch(actions.fetchDealers({ dealers }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
