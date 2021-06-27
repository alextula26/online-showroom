import * as actions from 'modules/redux/actions';
import API from 'modules/api';

export default (brandId) => async (dispatch) => {
  try {
    const models = await API.getModels(brandId);
    dispatch(actions.fetchModels({ models }));
    dispatch(actions.changeModelsLoader({ loading: false }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
