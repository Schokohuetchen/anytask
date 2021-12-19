import { TodoistApi } from '@doist/todoist-api-typescript';
import { getAccessToken, removeToken, setToken } from './localeStorage';
import { AddTaskPayload } from '../models/AddTaskPayload';

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

export const login = (authToken: string) => {
  return api(authToken).getProjects();
};

export const removeAuthToken = () => {
  removeToken();
};

export const fetchAllTasks = () => {
  const authToken = getAccessToken();

  if (!authToken) {
    throw new Error('No authToken, data could not be fetched.');
  } else {
    return api(authToken).getTasks({ filter: 'today | overdue' });
  }
};

export const addTask = (data: AddTaskPayload) => {
  const authToken = getAccessToken();

  if (!authToken) {
    throw new Error('No authToken, request could not be processed.');
  } else {
    return api(authToken).addTask(data);
  }
};

export const completeTask = (taskId: number) => {
  const authToken = getAccessToken();

  if (!authToken) {
    throw new Error('No authToken, request could not be processed.');
  } else {
    return api(authToken).closeTask(taskId);
  }
};

export const removeTask = (taskId: number) => {
  const authToken = getAccessToken();

  if (!authToken) {
    throw new Error('No authToken, request could not be processed.');
  } else {
    return api(authToken).deleteTask(taskId);
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
