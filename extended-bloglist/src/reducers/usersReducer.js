import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';
import { notify } from './notificationReducer';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => payload,
  },
});

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      dispatch(notify('Error fetching users'));
    }
  };
};

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
