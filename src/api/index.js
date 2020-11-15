import * as axios from "axios/index";

const instance = axios.create({
    baseURL: 'https://autos.autocrm.ru/api/v1/',
    responseType: 'json',
    headers: {
      'Authorization': "Bearer lW4pUiiMIaAQ8SSGN3gMIWCINafeyo2N"
    }
});

const API = {
    getBrands: () => (
        instance.get('/brands').then((responce) => responce.data.items)
    ),
    getModels: () => (
        instance.get(`/brands/${119}/models`).then((responce) => responce.data.items)
    ),
};

export default API;
