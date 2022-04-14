import instance from '../config/axiosClient';

const login = async (credentials) => {
  const response = await instance.post('/login', credentials);
  return response.data;
};

export default { login };
