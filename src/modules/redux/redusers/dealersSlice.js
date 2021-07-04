import { createSlice } from '@reduxjs/toolkit';

const dealersSlice = createSlice({
  name: 'dealers',
  initialState: {
    dealers: [],
  },
  reducers: {
    addDealers: (state, { payload }) => ({ ...state, dealers: payload.dealers.items }),
  },
});

export const { addDealers } = dealersSlice.actions;

export default dealersSlice.reducer;
