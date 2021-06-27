import * as actions from 'modules/redux/actions';
import API from 'modules/api';

export default () => async (dispatch) => {
  try {
    const brands = await API.getBrands();
    dispatch(actions.fetchBrands({ brands }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
