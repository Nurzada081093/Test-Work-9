import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ICategoryForm } from '../../types';
import {
  createCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getOneCategory
} from '../Thunks/categoriesThunks.ts';
import { RootState } from '../../app/store.ts';

interface IInitial {
  categories: ICategory[];
  category: ICategoryForm | null;
  loadings: {
    createLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
    oneCategoryLoading: boolean;
    editLoading: boolean;
  },
  error: boolean;
}

const initialState: IInitial = {
  categories: [],
  category: null,
  loadings: {
    createLoading: false,
    getLoading: false,
    deleteLoading: false,
    oneCategoryLoading: false,
    editLoading: false,
  },
  error: false,
};

export const allCategories = (state: RootState) => state.categories.categories;
export const oneCategory = (state: RootState) => state.categories.category;
export const createLoadingSlice = (state: RootState) => state.categories.loadings.createLoading;
export const getLoadingSlice = (state: RootState) => state.categories.loadings.getLoading;
export const editLoadingSlice = (state: RootState) => state.categories.loadings.editLoading;
export const oneLoadingSlice = (state: RootState) => state.categories.loadings.oneCategoryLoading;


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
      })
      .addCase(getCategories.pending, (state) => {
        state.loadings.getLoading = true;
        state.error = false;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.loadings.getLoading = false;
        state.error = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loadings.getLoading = false;
        state.error = true;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loadings.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loadings.deleteLoading = false;
        state.error = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loadings.deleteLoading = false;
        state.error = true;
      })
      .addCase(getOneCategory.pending, (state) => {
        state.loadings.oneCategoryLoading = true;
        state.error = false;
      })
      .addCase(getOneCategory.fulfilled, (state, action: PayloadAction<ICategoryForm | null>) => {
        state.loadings.oneCategoryLoading = false;
        state.error = false;
        state.category = action.payload;
      })
      .addCase(getOneCategory.rejected, (state) => {
        state.loadings.oneCategoryLoading = false;
        state.error = true;
      })
      .addCase(editCategory.pending, (state) => {
        state.loadings.editLoading = true;
        state.error = false;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.loadings.editLoading = false;
        state.error = false;
        state.category = null;
      })
      .addCase(editCategory.rejected, (state) => {
        state.loadings.editLoading = false;
        state.error = true;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;