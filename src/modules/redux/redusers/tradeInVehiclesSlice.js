import { createSlice } from '@reduxjs/toolkit';

const tradeInVehiclesSlice = createSlice({
  name: 'tradeInVehicles',
  initialState: {
    tradeInVehicles: {},
  },
  reducers: {
    addTradeInVehicles: (state, { payload }) => ({
      ...state,
      tradeInVehicles: payload.tradeInVehicles,
    }),
  },
});

export const { addTradeInVehicles } = tradeInVehiclesSlice.actions;

export default tradeInVehiclesSlice.reducer;
