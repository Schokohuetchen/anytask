import { User } from '../models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleError, handleSuccess, isAuthenticated, login } from '../data/api';
import { getAccessToken } from '../data/localeStorage';
import { RootState } from './store';

const initialState: User = { authToken: getAccessToken() || '', isLoggedIn: isAuthenticated() };

const userSlice = createSlice({
  name: 'users',
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
  },
});

export default userSlice.reducer;
export const { success, error } = userSlice.actions;

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

export const isLoggedIn = (state: RootState) => state.users;
