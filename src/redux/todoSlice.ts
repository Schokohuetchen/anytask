import { TodoItem } from '../models/TodoItem';
import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = [] as TodoItem[];

const todoItemSlice = createSlice({
  name: 'todoItems',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<TodoItem>) => {
        state.push(action.payload);
      },
      prepare: (content: string) => ({
        payload: {
          id: uuidv4(),
          due: { date: new Date() },
          content,
          completed: false,
        } as unknown as TodoItem,
      }),
    },
    removeTodo(state, action: PayloadAction<number>) {
      const index = state.findIndex((todoItem) => todoItem.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(state, action: PayloadAction<{ completed: boolean; id: number }>) {
      const index = state.findIndex((todoItem) => todoItem.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
});

export const { addTodo, removeTodo, setTodoStatus } = todoItemSlice.actions;
export default todoItemSlice.reducer;
