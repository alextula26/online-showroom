import * as actions from '../actions';
import API from '../api';

export default (brandId) => async (dispatch) => {
  try {
    const models = await API.getModels(brandId);
    dispatch(actions.fetchModels({ models }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
