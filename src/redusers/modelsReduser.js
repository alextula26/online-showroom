import { createAction, handleActions } from 'redux-actions';
import API from '../api';

const fetchModelsSuccess = createAction('MODELS_FETCH_SUCCESS');

const modelsReduser = handleActions({
    [fetchModelsSuccess](state, { payload }) {
        return [...state, ...payload.models ];
    },
}, []);

export const fetchModels = () => async (dispatch) => {
    const [brands] = await API.getBrands();
    const { id } = brands;    
    const models = await API.getModels(id);
    dispatch(fetchModelsSuccess({ models }));
}

export default modelsReduser;
