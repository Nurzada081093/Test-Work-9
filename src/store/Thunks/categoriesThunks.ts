import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { ICategoryForm } from '../../types';

export const createCategory = createAsyncThunk<void, ICategoryForm>(
  'categories/createCategory',
  async (category) => {
    await axiosRequest.post('categories.json', {...category});
  }
);