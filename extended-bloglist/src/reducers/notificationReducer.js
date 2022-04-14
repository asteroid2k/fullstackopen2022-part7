import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotif: (state, { payload }) => payload,
    remove: () => initialState,
  },
});

export const notify = (msg) => {
  return (dispatch) => {
    clearTimeout(window.notif);
    dispatch(setNotif(msg));
    window.notif = setTimeout(() => dispatch(remove()), 5000);
  };
};

export const { setNotif, remove } = notificationSlice.actions;
export default notificationSlice.reducer;
