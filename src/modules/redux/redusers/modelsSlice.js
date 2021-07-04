import { createSlice } from '@reduxjs/toolkit';

const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    models: [],
    brand: {},
    loading: true,
  },
  reducers: {
    addhModels: (state, { payload }) => ({
      ...state,
      models: payload.models.items,
      brand: payload.models.brand,
    }),

    changeModelsLoader: (state, { payload }) => ({
      ...state,
      loading: payload.loading,
    }),
  },
});

export const { addhModels, changeModelsLoader } = modelsSlice.actions;

export default modelsSlice.reducer;
