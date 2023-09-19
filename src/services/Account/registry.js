/** @format */

import * as request from '~/ultil/httpRequest';

export const Registry = async (data) => {
  var respone = { status: 500, message: '' };
  try {
    const res = await request.post(`Account/registrater`, data);
    respone.status = res.status;
    respone.message = res.data.message;
  } catch (error) {
    if (error.response.status === 500) {
      respone.message = 'Server run into error, please try later !';
      respone.status = 500;
    } else {
      if (error.response.status === 400) {
        respone.status = 400;

        if (error.response.data.message !== undefined) {
          respone.message = error.response.data.message;
        } else {
          respone.message = error.response.data.message;
        }
      }
    }
  }
  return respone;
};
