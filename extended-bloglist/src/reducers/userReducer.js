import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => payload,
  },
});

export const getUser = (id) => {
  return async (dispatch) => {
    const user = await userService.get(id);
    dispatch(setUser(user));
  };
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
