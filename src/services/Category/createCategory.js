/** @format */

import * as request from '~/ultil/httpRequest';

export const createCategory = async (data) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  try {
    const res = await request.authPost(`Category/CreateCategory`, data, config);
    return res;
  } catch (error) {
    console.log(error);
  }
};
