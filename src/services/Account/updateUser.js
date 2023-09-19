/** @format */

import * as request from '~/ultil/httpRequest';

export const UpdateUser = async (data) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  console.log(data);
  try {
    const res = await request.authPut(`Account/UpdateUser`, data, config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
