/** @format */

import * as request from '~/ultil/httpRequest';

export const updateCategory = async (id, data) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  try {
    const res = await request.authPut(
      `Category/UpdateCategory/${id}`,
      data,
      config
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
