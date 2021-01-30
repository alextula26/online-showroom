import * as actions from '../actions';
import API from '../api';

export default (brandId) => async (dispatch) => {
  try {
    const models = await API.getModels(brandId);
    const { items, brand } = models;
    dispatch(actions.fetchModels({ items }));
    dispatch(actions.fetchBrandModels({ brand }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
