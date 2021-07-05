import { createSlice } from '@reduxjs/toolkit';

const tradeInVehiclesSlice = createSlice({
  name: 'tradeInVehicles',
  initialState: {
    tradeInVehicles: {},
    loading: true,
  },
  reducers: {
    addTradeInVehicles: (state, { payload }) => ({
      ...state,
      tradeInVehicles: payload.tradeInVehicles,
    }),
    changeTradeInVehiclesLoader: (state, { payload }) => ({
      ...state,
      loading: payload.loading,
    }),
  },
});

export const { addTradeInVehicles, changeTradeInVehiclesLoader } = tradeInVehiclesSlice.actions;

export default tradeInVehiclesSlice.reducer;
