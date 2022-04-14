import instance from '../config/axiosClient';
const resource = 'blogs';

const getAll = () => {
  const request = instance.get(resource);
  return request.then((response) => response.data);
};
const create = (payload) => {
  const request = instance.post(resource, payload);
  return request.then((response) => response.data);
};
const edit = (payload) => {
  const request = instance.put(`${resource}/${payload.id}`, payload);
  return request.then((response) => response.data);
};
const remove = (payload) => {
  const request = instance.delete(`${resource}/${payload.id}`);
  return request.then((response) => response.data);
};
const comment = ({ id, comment }) => {
  const request = instance.post(`${resource}/${id}/comment`, { comment });
  return request.then((response) => response.data);
};

export default { getAll, create, edit, comment, remove };
