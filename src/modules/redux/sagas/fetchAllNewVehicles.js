export default function* fetchAllNewVehicles(brands, typeVehicles, query) {
  yield console.log('brands', brands);
  yield console.log('typeVehicles', typeVehicles);
  yield console.log('query', query);
}
