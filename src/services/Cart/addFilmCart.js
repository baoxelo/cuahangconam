/** @format */

import * as request from '~/ultil/httpRequest';

export const addFilmToCart = async (data) => {
  var response = {
    status: '',
    message: '',
  };
  try {
    const res = await request.authPost(`Cart/AddFilmToCart`, data);
    response.status = res.status;
    response.message = res.data.message;
  } catch (error) {
    console.log(error);
    response.status = error.status;
  }
  return response;
};
