import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { APITransition, ICategoryForm, ITransition, ITransitionForm } from '../../types';

export const createTransaction = createAsyncThunk<void, ITransitionForm>(
  'transactions/createTransaction',
  async (transition) => {
    await axiosRequest.post('transactions.json', {...transition});
  }
);

export const getTransitions = createAsyncThunk<ITransition[], void>(
  'transactions/getTransitions',
  async () => {
    const responseTransactions: {data: APITransition  | null} = await axiosRequest('transactions.json');
    const transactionsData = responseTransactions.data;

    if (transactionsData === null) {
      return [];
    }

    const allTransitions = Object.keys(transactionsData).map((transitionId) => {
      return {
        ...transactionsData[transitionId],
        id: transitionId,
      };
    });

    return allTransitions.reverse();
  }
);

export const deleteTransaction = createAsyncThunk<void, string>(
  'transactions/deleteTransaction',
  async (id: string) => {
    await axiosRequest.delete(`transactions/${id}.json`);
  }
);

export const getOneTransaction = createAsyncThunk<ITransitionForm| null, string>(
  'transactions/getOneTransaction',
  async (id: string) => {
    const responseTransaction = await axiosRequest(`transactions/${id}.json`);
    return responseTransaction.data || null;
  }
);

export const editTransactions = createAsyncThunk<void, {id: string, categoryFromAPI: ICategoryForm}>(
  'transactions/editTransactions',
  async ({id, categoryFromAPI}) => {
    await axiosRequest.put(`categories/${id}.json`, {...categoryFromAPI});
  }
);