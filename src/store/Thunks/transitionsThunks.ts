import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { APITransition, ITransition, ITransitionForm } from '../../types';

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