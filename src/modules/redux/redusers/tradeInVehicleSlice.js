import { createSlice } from '@reduxjs/toolkit';

const tradeInVehicleSlice = createSlice({
  name: 'tradeInVehicle',
  initialState: {
    vehicle: {},
  },
  reducers: {
    addTradeInVehicle: (state, { payload }) => ({
      ...state,
      vehicle: payload.vehicle,
    }),
  },
});

export const { addTradeInVehicle } = tradeInVehicleSlice.actions;

export default tradeInVehicleSlice.reducer;
