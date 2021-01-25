import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const dealersReduser = handleActions({
  [actions.fetchDealers](state, { payload }) {
    return [...state, ...payload.dealers];
  },
}, []);

export default dealersReduser;
