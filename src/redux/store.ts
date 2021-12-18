import { configureStore } from '@reduxjs/toolkit';
import todoItemsReducer from './todoSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    todoItems: todoItemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
