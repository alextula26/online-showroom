import { createSlice } from '@reduxjs/toolkit';

const newVehiclesSlice = createSlice({
  name: 'newVehicles',
  initialState: {
    vehicles: [],
    model: {},
    brand: {},
    loading: true,
  },
  reducers: {
    addNewVehicles: (state, { payload }) => ({
      ...state,
      vehicles: payload.vehicles.items,
      model: payload.vehicles.model,
      brand: payload.vehicles.brand,
    }),

    changeVehiclesLoader: (state, { payload }) => ({
      ...state,
      loading: payload.loading,
    }),
  },
});

export const { addNewVehicles, changeVehiclesLoader } = newVehiclesSlice.actions;

export default newVehiclesSlice.reducer;
