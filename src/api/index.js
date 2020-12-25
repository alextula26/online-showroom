import * as axios from 'axios/index';
import routes from '../routes';

const instance = axios.create({
  baseURL: 'https://autos.autocrm.ru/api/v1/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Access-Control-Allow-Headers':
    // 'Bearer, API-Key, Content-Type,
    // If-Modified-Since, Cache-Control, Origin, X-Requested-With, Accept',
    'Access-Control-Allow-Headers': 'Bearer, Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    Authorization: 'Bearer lW4pUiiMIaAQ8SSGN3gMIWCINafeyo2N',
  },
});

const API = {
  getDealers: () => (
    instance.get(routes.dealers()).then((responce) => responce.data)
  ),
  getBrands: () => (
    instance.get(routes.brands()).then((responce) => responce.data.items)
  ),
  getModels: (brandId) => (
    instance.get(routes.models(brandId)).then((responce) => responce.data)
  ),
  getVehicles: (modelId, query = '') => (
    instance.get(routes.vehicles(modelId, query)).then((responce) => responce.data)
  ),
  getVehicle: (vehicleId) => (
    instance.get(routes.vehicle(vehicleId)).then((responce) => responce.data)
  ),
};

export default API;
