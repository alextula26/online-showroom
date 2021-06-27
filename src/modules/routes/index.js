export default {
  dealers: () => ['dealerships'].join('/'),
  brands: () => ['brands'].join('/'),
  models: (brandId) => ['brands', brandId, 'models'].join('/'),
  newVehicles: (modelId, query) => ['models', modelId, `vehicles${query}`].join('/'),
  newVehicle: (newVehicleId) => ['vehicles', newVehicleId].join('/'),
  tradeInVehicles: () => ['tradein', 'vehicles'].join('/'),
  tradeInVehicle: (tradeInVehicleId) => ['tradein', tradeInVehicleId].join('/'),
  color: (modelId) => ['models', modelId, 'colors'].join('/'),
};
