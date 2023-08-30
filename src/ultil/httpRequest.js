/** @format */

import axios from 'axios';
const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path) => {
  const response = await httpRequest.get(path);
  return response;
};
export const post = async (path, data = {}) => {
  const response = await httpRequest.post(path, data);
  return response;
};

export const authGet = async (path, config) => {
  const response = await httpRequest.get(path, config);
  return response;
};
