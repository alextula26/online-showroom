import * as axios from 'axios/index';
import routes from '../routes';

const instance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://autos.autocrm.ru/api/v1/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Access-Control-Allow-Headers':
    // 'Bearer, API-Key, Content-Type,
    // If-Modified-Since, Cache-Control, Origin, X-Requested-With, Accept',
    'Access-Control-Allow-Headers': 'Bearer, Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer VLRoq17fvx95aiozD18A15Ug_TUNAUc3',
  },
});

const API = {
  getDealers: () => (
    instance.get(routes.dealers()).then((responce) => responce.data)
  ),
  getBrands: () => (
    instance.get(routes.brands()).then((responce) => responce.data)
  ),
  getModels: (brandId) => (
    instance.get(routes.models(brandId)).then((responce) => responce.data)
  ),
  getNewVehicles: (modelId, query = '') => (
    instance.get(routes.newVehicles(modelId, query)).then((responce) => responce.data)
  ),
  getVehicle: (vehicleId) => (
    instance.get(routes.newVehicle(vehicleId)).then((responce) => responce.data)
  ),
  getTradeInVehicles: () => (
    instance.get(routes.tradeInVehicles()).then((responce) => responce.data)
  ),
  getTradeInVehicle: (tradeInVehicleId) => (
    instance.get(routes.tradeInVehicle(tradeInVehicleId)).then((responce) => responce.data)
  ),
  getModelColor: (modelId) => (
    instance.get(routes.color(modelId)).then((responce) => responce.data.items)
  ),
};

export default API;
