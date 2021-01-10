const host = 'https://autos.autocrm.ru/api/v1';

export default {
  dealers: () => [host, 'dealerships'].join('/'),
  brands: () => [host, 'brands'].join('/'),
  models: (brandId) => [host, 'brands', brandId, 'models'].join('/'),
  vehicles: (modelId, query) => [host, 'models', modelId, `vehicles${query}`].join('/'),
  vehicle: (vehicleId) => [host, 'vehicles', vehicleId].join('/'),
};