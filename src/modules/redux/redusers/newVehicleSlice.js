import { createSlice } from '@reduxjs/toolkit';

const newVehicleSlice = createSlice({
  name: 'newVehicle',
  initialState: {
    vehicle: {},
  },
  reducers: {
    addNewVehicle: (state, { payload }) => ({
      ...state,
      vehicle: payload.vehicle,
    }),
  },
});

export const { addNewVehicle } = newVehicleSlice.actions;

export default newVehicleSlice.reducer;
