import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    blogs: blogReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
});

export default store;
