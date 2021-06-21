import CONST from '../utils/const';
import API from '../api';

const mappingTypeVehicles = {
  [CONST.vehiclesTypes.newVehicles]: (modelId, query) => API.getNewVehicles(modelId, query),
  [CONST.vehiclesTypes.tradeInVehicles]: () => API.getTradeInVehicles(),
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
