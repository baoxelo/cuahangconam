/** @format */

import axios from 'axios';
const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
const config = {
  withCredentials: true,
};

export const get = async (path) => {
  const response = await httpRequest.get(path);
  return response;
};
export const post = async (path, data = {}, config = {}) => {
  const response = await httpRequest.post(path, data, config);
  return response;
};

export const authGet = async (path) => {
  const response = await httpRequest.get(path, config);
  return response;
};
export const authPost = async (path, data = {}) => {
  const response = await httpRequest.post(path, data, config);
  return response;
};
export const authPut = async (path, data = {}) => {
  const response = await httpRequest.put(path, data, config);
  return response;
};
export const authDelete = async (path, data = {}) => {
  const response = await httpRequest.delete(path, data, config);
  return response;
};
