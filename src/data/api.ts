import { TodoistApi } from '@doist/todoist-api-typescript';
import { getAccessToken, removeToken, setToken } from './localeStorage';

interface AddTaskPayload {
  content: string;
  due_date: string;
}

const api = (authToken: string) => {
  return new TodoistApi(authToken);
};

export const handleError = (e: any) => {
  removeToken();
  console.log(e);
};

export const handleSuccess = (authToken: string) => {
  setToken(authToken);
};

export const login = async (authToken: string) => {
  await api(authToken).getProjects();
};

export const fetchTasks = async () => {
  const authToken = getAccessToken();

  if (!authToken) {
    return;
  }

  await api(authToken).getTasks();
};

export const addTask = async (data: AddTaskPayload) => {
  const authToken = getAccessToken();

  if (!authToken) {
    return;
  }

  await api(authToken).addTask(data);
};

export const removeTask = async (taskId: number) => {
  const authToken = getAccessToken();

  if (!authToken) {
    return;
  }

  await api(authToken).deleteTask(taskId);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
