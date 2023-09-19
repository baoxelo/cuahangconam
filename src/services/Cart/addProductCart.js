/** @format */

import * as request from '~/ultil/httpRequest';

export const addProductToCart = async (data) => {
  var response = {
    status: '',
    message: '',
  };
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  try {
    const res = await request.authPost(`Cart/AddProductToCart`, data, config);
    response.status = res.status;
    response.message = res.data.message;
  } catch (error) {
    console.log(error);
    response.status = error.status;
  }
  return response;
};
