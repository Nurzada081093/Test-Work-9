import {configureStore} from "@reduxjs/toolkit";
import { categoriesReducer } from '../store/Slices/categoriesSlices.ts';
import { transactionsReducer } from '../store/Slices/transactionsSlices.ts';

export const store = configureStore({
  reducer: {
    'categories': categoriesReducer,
    'transactions': transactionsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
