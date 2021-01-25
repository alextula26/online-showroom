// const host = 'https://cors-anywhere.herokuapp.com/https://autos.autocrm.ru/api/v1/';
const host = 'https://cors-anywhere.herokuapp.com/https://autos.autocrm.ru/api/v1/';

export default {
  dealers: () => [host, 'dealerships'].join('/'),
  brands: () => [host, 'brands'].join('/'),
  models: (brandId) => [host, 'brands', brandId, 'models'].join('/'),
  newVehicles: (modelId, query) => [host, 'models', modelId, `vehicles${query}`].join('/'),
  newVehicle: (newVehicleId) => [host, 'vehicles', newVehicleId].join('/'),
  tradeInVehicles: () => [host, 'tradein', 'vehicles'].join('/'),
  tradeInVehicle: (tradeInVehicleId) => [host, 'tradein', tradeInVehicleId].join('/'),
  color: (modelId) => [host, 'models', modelId, 'colors'].join('/'),
};
