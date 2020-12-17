import * as axios from 'axios/index';
import { isEmpty } from '../utils';

const instance = axios.create({
  baseURL: 'https://autos.autocrm.ru/api/v1/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Bearer, API-Key, Content-Type, If-Modified-Since, Cache-Control',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
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
  getVehicles: (modelId, options = {}) => {
    const query = !isEmpty(options) ? `?${options.field}=${options.filterElementId}` : '';
    return instance.get(`/models/${modelId}/vehicles${query}`).then((responce) => responce.data);
  },
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
