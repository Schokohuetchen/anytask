import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTask, completeTask, fetchAllTasks, handleError, removeTask } from '../data/api';
import { Task } from '@doist/todoist-api-typescript';
import { AddTaskPayload } from '../models/AddTaskPayload';

interface TaskList {
  tasks?: Task[];
  selectedTasks?: number[];
}

const initialState: TaskList = { selectedTasks: [], tasks: [] };

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
    selectTask: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedTasks: [...state.selectedTasks!!, action.payload],
      };
    },
    deselectTask: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedTasks: state.selectedTasks?.filter((taskId) => taskId !== action.payload),
      };
    },
    deselectAll: (state) => {
      return {
        ...state,
        selectedTasks: [],
      };
    },
    error: (state) => {
      return {
        ...state,
      };
    },
  },
});

export const { allTasks, selectTask, deselectTask, deselectAll, error } = taskSlice.actions;
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

export const addNewTask = (data: AddTaskPayload) => (dispatch: any) => {
  try {
    addTask(data)
      .then(() => {
        dispatch(fetchTasks());
      })
      .catch((e) => {
        dispatch(error());
        console.log(e);
      });
  } catch (e) {
    dispatch(error());
    console.log(e);
  }
};

export const deleteTask = (taskId: number) => (dispatch: any) => {
  try {
    removeTask(taskId)
      .then(() => {
        dispatch(deselectTask(taskId));
        dispatch(fetchTasks());
      })
      .catch((e) => {
        dispatch(error());
        console.log(e);
      });
  } catch (e) {
    dispatch(error());
    console.log(e);
  }
};
