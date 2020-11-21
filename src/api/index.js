import * as axios from 'axios/index';

const instance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://autos.autocrm.ru/api/v1/',
  // contentType: 'application/json',
  responseType: 'json',
  headers: {
    'Content-Type': 'origin, x-requested-with',
    // 'X-Requested-With': 'XMLHttpRequest',
    Authorization: 'Bearer lW4pUiiMIaAQ8SSGN3gMIWCINafeyo2N',
  },
});

const API = {
  getDealers: () => (
    instance.get('/dealerships').then((responce) => responce.data)
  ),
  getBrands: () => (
    instance.get('/brands').then((responce) => responce.data.items)
  ),
  getModels: (brandId) => (
    instance.get(`/brands/${brandId}/models`).then((responce) => responce.data.items)
  ),
};

export default API;
