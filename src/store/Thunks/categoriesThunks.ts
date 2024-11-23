import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { APICategory, ICategory, ICategoryForm } from '../../types';

export const createCategory = createAsyncThunk<void, ICategoryForm>(
  'categories/createCategory',
  async (category) => {
    await axiosRequest.post('categories.json', {...category});
  }
);

export const getCategories = createAsyncThunk<ICategory[], void>(
  'categories/getCategories',
  async () => {
    const responseCategories: {data: APICategory  | null} = await axiosRequest('categories.json');
    const categoriesData = responseCategories.data;

    if (categoriesData === null) {
      return [];
    }

    const allCategories = Object.keys(categoriesData).map((categoryId) => {
      return {
        ...categoriesData[categoryId],
        id: categoryId,
      };
    });

    return allCategories.reverse();
  }
);

export const deleteCategory = createAsyncThunk<void, string>(
  'categories/deleteCategory',
  async (id: string) => {
    await axiosRequest.delete(`categories/${id}.json`);
  }
);

export const getOneCategory = createAsyncThunk<ICategoryForm | null, string>(
  'categories/getOneCategory',
  async (id: string) => {
    const responseCategory = await axiosRequest(`categories/${id}.json`);
    return responseCategory.data || null;
  }
);

export const editCategory = createAsyncThunk<void, {id: string, categoryFromAPI: ICategoryForm}>(
  'categories/editCategory',
  async ({id, categoryFromAPI}) => {
    await axiosRequest.put(`categories/${id}.json`, {...categoryFromAPI});
  }
);
