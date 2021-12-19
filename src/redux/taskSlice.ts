import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { completeTask, fetchAllTasks, handleError } from '../data/api';
import { Task } from '@doist/todoist-api-typescript';

interface TaskList {
  tasks?: Task[];
}

const initialState: TaskList = {};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    allTasks: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    error: (state) => {
      return {
        ...state,
      };
    },
  },
});

export const { allTasks, error } = taskSlice.actions;
export default taskSlice.reducer;

export const fetchTasks = () => async (dispatch: any) => {
  try {
    await fetchAllTasks()
      .then((tasks: Task[]) => {
        dispatch(allTasks({ tasks }));
      })
      .catch((e) => {
        dispatch(error());
        console.log(e);
      });
  } catch (e) {
    dispatch(error());
    handleError(e);
  }
};

export const markAsComplete = (taskId: number) => async (dispatch: any) => {
  try {
    await completeTask(taskId)
      .then(() => {
        dispatch(fetchTasks());
      })
      .catch((e) => {
        dispatch(error());
        console.log(e);
      });
  } catch (e) {
    dispatch(error());
    handleError(e);
  }
};
