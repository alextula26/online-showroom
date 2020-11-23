import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchCarsSuccess = createAction('FETCH_CARS');

const carsReducer = handleActions({
  [fetchCarsSuccess](state, { payload }) {
    return [...state, ...payload.cars];
  },
}, []);

export const fetchCars = (modelId) => async (dispatch) => {
  const cars = await API.getCars(modelId);
  dispatch(fetchCarsSuccess({ cars }));
};

export default carsReducer;
