import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { notify } from './notificationReducer';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, { payload }) => payload,
    appendBlog(state, { payload }) {
      state.push(payload);
    },
    replaceBlog: (state, { payload }) =>
      state.map((blog) => (blog.id !== payload.id ? blog : payload)),
    removeBlog: (state, { payload }) =>
      state.filter((blog) => blog.id === payload.id),
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(notify('Error fetching blogs'));
    }
  };
};
export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
    } catch (error) {
      dispatch(notify('Error creating blog'));
    }
  };
};
export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const blog = blogs.find((n) => n.id === id);
    const payload = { ...blog, likes: blog.likes + 1 };
    try {
      const edited = await blogService.edit(payload);
      dispatch(replaceBlog(edited));
    } catch (error) {
      dispatch(notify('Error liking blog'));
    }
  };
};
export const commentBlog = ({ id, comment }) => {
  return async (dispatch) => {
    try {
      const edited = await blogService.comment({ id, comment });
      dispatch(replaceBlog(edited));
    } catch (error) {
      dispatch(notify('Error commenting blog'));
    }
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove({ id });
      dispatch(removeBlog({ id }));
    } catch (error) {
      dispatch(notify('Error deleting blog'));
    }
  };
};

export const { appendBlog, setBlogs, replaceBlog, removeBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
