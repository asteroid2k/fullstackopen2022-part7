export const getToken = () => {
  const userJSON = window.localStorage.getItem('blog-list-user');
  if (userJSON) {
    return JSON.parse(userJSON);
  }
  return null;
};
export const setToken = (user) => {
  window.localStorage.setItem('blog-list-user', JSON.stringify(user));
};
