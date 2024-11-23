import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteTransaction,
  getOneTransaction,
  getTransitions
} from '../Thunks/transitionsThunks.ts';
import { ITransition } from '../../types';
import { RootState } from '../../app/store.ts';

interface InterfaceInitial {
  transactions: ITransition[];
  transaction: ITransition | null;
  loadings: {
    createLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
    oneTransactionLoading: boolean;
  },
  error: boolean;
}

const initialState: InterfaceInitial = {
  transactions: [],
  transaction: null,
  loadings: {
    createLoading: false,
    getLoading: false,
    deleteLoading: false,
    oneTransactionLoading: false,
  },
  error: false,
};

export const allTransitions = (state: RootState) => state.transactions.transactions;
export const createLoadingSlice = (state: RootState) => state.transactions.loadings.createLoading;
export const getLoadingSlice = (state: RootState) => state.transactions.loadings.getLoading;

const transactionsSlices = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loadings.createLoading = true;
        state.error = false;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.loadings.createLoading = false;
        state.error = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.loadings.createLoading = false;
        state.error = true;
      })
      .addCase(getTransitions.pending, (state) => {
        state.loadings.getLoading = true;
        state.error = false;
      })
      .addCase(getTransitions.fulfilled, (state, action: PayloadAction<ITransition[]>) => {
        state.loadings.getLoading = false;
        state.error = false;
        state.transactions = action.payload;
      })
      .addCase(getTransitions.rejected, (state) => {
        state.loadings.getLoading = false;
        state.error = true;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loadings.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.loadings.deleteLoading = false;
        state.error = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.loadings.deleteLoading = false;
        state.error = true;
      })
      .addCase(getOneTransaction.pending, (state) => {
        state.loadings.oneTransactionLoading = true;
        state.error = false;
      })
      .addCase(getOneTransaction.fulfilled, (state) => {
        state.loadings.oneTransactionLoading = false;
        state.error = false;
      })
      .addCase(getOneTransaction.rejected, (state) => {
        state.loadings.oneTransactionLoading = false;
        state.error = true;
      });

  }
});

export const transactionsReducer = transactionsSlices.reducer;