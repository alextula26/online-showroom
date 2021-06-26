import * as actions from '../../actions';
import API from '../../api';

export default () => async (dispatch) => {
  try {
    const brands = await API.getBrands();
    dispatch(actions.fetchBrands({ brands }));
  } catch (e) {
    console.log(e);
    throw e;
  }
};
