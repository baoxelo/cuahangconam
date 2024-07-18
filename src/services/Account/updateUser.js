/** @format */

import * as request from '~/ultil/httpRequest';

export const UpdateUser = async (data) => {
  console.log(data);
  try {
    const res = await request.authPut(`Account/UpdateUser`, data);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
