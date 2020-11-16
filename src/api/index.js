import * as axios from 'axios/index';

const instance = axios.create({
  baseURL: 'https://autos.autocrm.ru/api/v1/',
  responseType: 'json',
  headers: {
    Authorization: 'Bearer lW4pUiiMIaAQ8SSGN3gMIWCINafeyo2N',
  },
});

const API = {
  getBrands: () => (
    instance.get('/brands').then((responce) => responce.data.items)
  ),
  getModels: (brandId) => (
    instance.get(`/brands/${brandId}/models`).then((responce) => responce.data.items)
  ),
};

export default API;
