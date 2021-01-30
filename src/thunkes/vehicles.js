import API from '../api';

const mappingTypeVehicles = {
  newVehicles: (modelId, query) => API.getNewVehicles(modelId, query),
  tradeInVehicles: () => API.getTradeInVehicles(),
};

export default async (modelId = null, typeVehicles, query = '') => {
  const vehicles = await mappingTypeVehicles[typeVehicles](modelId, query);

  const promisesVehicles = vehicles.items.map(async (vehicle) => {
    const { general, images } = await API.getVehicle(vehicle.id);
    return { ...vehicle, general, images };
  });

  const promisesVehiclesSettled = await Promise.allSettled(promisesVehicles);

  const items = await promisesVehiclesSettled
    .filter((item) => item.status === 'fulfilled')
    .map(({ value }) => value);

  return { ...vehicles, items };
};
