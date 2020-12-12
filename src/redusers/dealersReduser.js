import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const dealersReduser = handleActions({
  [actions.fetchDealersSuccess](state, { payload }) {
    return [...state, ...payload.dealers];
  },
}, []);

export default dealersReduser;
