import { createSlice } from '@reduxjs/toolkit';
import { ICategoryForm } from '../../types';
import { createCategory } from '../Thunks/categoriesThunks.ts';

interface IInitial {
  categories: ICategoryForm[];
  category: ICategoryForm | null;
  loadings: {
    createLoading: boolean;
  },
  error: boolean;
}

const initialState: IInitial = {
  categories: [],
  category: null,
  loadings: {
    createLoading: false,
  },
  error: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loadings.createLoading = true;
        state.error = false;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loadings.createLoading = false;
        state.error = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.loadings.createLoading = false;
        state.error = true;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;