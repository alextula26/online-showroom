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
    instance.get(`/brands/${brandId}/models`).then((responce) => responce.data)
  ),
  getVehicles: (modelId) => (
    instance.get(`/models/${modelId}/vehicles`).then((responce) => responce.data)
  ),
  getCharacteristics: (modificationId) => (
    instance.get(`/info/characteristics/${modificationId}`).then((responce) => responce.data)
  ),
  getModifications: (modelId) => (
    instance.get(`/models/${modelId}/modifications`).then((responce) => responce.data.items)
  ),
  getVehicle: (vehicleId) => (
    instance.get(`/vehicles/${vehicleId}`).then((responce) => responce.data)
  ),
};

export default API;
