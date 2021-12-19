import { Authentication } from '../models/Authentication';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleError, handleSuccess, isAuthenticated, login, removeAuthToken } from '../data/api';
import { getAccessToken } from '../data/localeStorage';

const initialState: Authentication = {
  authToken: getAccessToken() || '',
  isLoggedIn: isAuthenticated(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    success: (state, action: PayloadAction<string>) => {
      return {
        isLoggedIn: true,
        authToken: action.payload,
      };
    },
    error: () => {
      return {
        authToken: '',
        isLoggedIn: false,
      };
    },
    logout: () => {
      return {
        authToken: '',
        isLoggedIn: false,
      };
    },
  },
});

export default authSlice.reducer;
export const { success, error, logout } = authSlice.actions;

export const authenticateUser = (authToken: string) => (dispatch: any) => {
  login(authToken)
    .then(() => {
      handleSuccess(authToken);
      dispatch(success(authToken));
    })
    .catch((e) => {
      handleError(e);
      dispatch(error());
    });
};

export const removeAuthentication = () => (dispatch: any) => {
  try {
    removeAuthToken();
    dispatch(logout());
  } catch (e) {
    dispatch(error());
    console.log(e);
  }
};
