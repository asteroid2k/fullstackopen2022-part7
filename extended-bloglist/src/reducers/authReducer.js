import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/login';
import { notify } from '../reducers/notificationReducer';
import { getToken, setToken } from '../utils';

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => payload,
  },
});

export const initializeAuth = () => {
  return (dispatch) => {
    const authUser = getToken();
    dispatch(setAuth(authUser));
  };
};

export const login = (content) => {
  return async (dispatch) => {
    try {
      const user = await authService.login(content);
      dispatch(setAuth(user));
      setToken(user);
    } catch (error) {
      dispatch(notify('Wrong credentials'));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(setAuth({}));
    window.localStorage.clear();
  };
};

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
