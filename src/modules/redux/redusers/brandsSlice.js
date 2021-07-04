import { createSlice } from '@reduxjs/toolkit';

const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
  },
  reducers: {
    addBrands: (state, { payload }) => ({ ...state, brands: payload.brands.items }),
  },
});

export const { addBrands } = brandsSlice.actions;

export default brandsSlice.reducer;
