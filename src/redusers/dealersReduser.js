import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchDealersSuccess = createAction('DEALERS_FETCH_SUCCESS');

const dealersReduser = handleActions({
  [fetchDealersSuccess](state, { payload }) {
    return [...state, ...payload.dealers];
  },
}, []);

export const fetchDealers = () => async (dispatch) => {
  const dealers = await API.getDealers();
  dispatch(fetchDealersSuccess({ dealers }));
};

export default dealersReduser;
