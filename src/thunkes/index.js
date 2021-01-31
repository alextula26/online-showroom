import CONST from '../utils/const';
import addDealers from './dealers';
import addBrands from './brands';
import addModels from './models';
import addVehicle from './vehicle';
import addNewVehicles from './newVehicles';
import addTradeInVehicles from './tradeInVehicles';
import addFilteredVehicles from './filterVehicles';
import addFilteredVehiclesByPrice from './filterVehiclesByPrice';

export const fetchDealers = () => addDealers();
export const fetchBrands = () => addBrands();
export const fetchModels = (brandId) => addModels(brandId);
export const fetchNewVehicle = (vehicleId) => addVehicle(vehicleId);
export const fetchNewVehicles = (modelId) => addNewVehicles(modelId, CONST.vehiclesTypes.newVehicles, '');
export const fetchTradeInVehicles = () => addTradeInVehicles(null, CONST.vehiclesTypes.tradeInVehicles, '');
export const fetchFilterVehicles = (options) => addFilteredVehicles(options);
export const fetchFilterVehiclesByPrice = (options) => addFilteredVehiclesByPrice(options);
