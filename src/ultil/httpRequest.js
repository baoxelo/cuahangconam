/** @format */

import axios from 'axios';
axios.defaults.withCredentials = true;
const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path) => {
  const response = await httpRequest.get(path);
  return response;
};
export const post = async (path, data = {}, config = {}) => {
  const response = await httpRequest.post(path, data, config);
  return response;
};

export const authGet = async (path) => {
  const response = await httpRequest.get(path, { withCredentials: true });
  return response;
};
export const authPost = async (path, data = {}, config) => {
  const response = await httpRequest.post(path, data, config);
  return response;
};
export const authPut = async (path, data = {}, config) => {
  const response = await httpRequest.put(path, data, config);
  return response;
};
export const authDelete = async (path, config) => {
  const response = await httpRequest.delete(path, config);
  return response;
};
