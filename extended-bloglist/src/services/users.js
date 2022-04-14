import instance from '../config/axiosClient';
const resource = 'users';

const getAll = () => {
  const request = instance.get(resource);
  return request.then((response) => response.data);
};
const get = (id) => {
  const request = instance.get(`${resource}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, get };
