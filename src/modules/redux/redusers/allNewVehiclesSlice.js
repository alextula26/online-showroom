import { createSlice } from '@reduxjs/toolkit';

const allNewVehiclesSlice = createSlice({
  name: 'allNewVehicles',
  initialState: {
    allNewVehicles: {},
  },
  reducers: {
    addAllNewVehicles: (state, { payload }) => ({
      ...state,
      allNewVehicles: payload.allNewVehicles,
    }),
  },
});

export const { addAllNewVehicles } = allNewVehiclesSlice.actions;

export default allNewVehiclesSlice.reducer;
