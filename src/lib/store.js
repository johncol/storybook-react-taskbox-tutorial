import { configureStore } from '@reduxjs/toolkit';
import { TaskSlice } from './taskbox';

export const store = configureStore({
  reducer: {
    taskbox: TaskSlice.reducer,
  },
});
