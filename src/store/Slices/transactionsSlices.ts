import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  transaction: null,
  loadings: {
    createLoading: false
  },
  error: false,
};

const transactionsSlices = createSlice({
  name: 'transactions',
  initialState,
  reducers: {}
});

export const transactionsReducer = transactionsSlices.reducer;