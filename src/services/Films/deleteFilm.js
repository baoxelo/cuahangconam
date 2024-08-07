/** @format */

import * as request from '~/ultil/httpRequest';

export const DeleteFilm = async (id) => {
  var respone = { status: 500, message: '' };
  try {
    const res = await request.authDelete(`Film/DeleteFilm/${id}`);
    respone.status = res.status;
    respone.message = 'Xóa sản phẩm thành công';
  } catch (error) {
    console.log(error.response.data);
    if (error.response.status === 500) {
      respone.message = 'Server run into error, please try later !';
      respone.status = 500;
    } else {
      if (error.response.status === 400) {
        respone.status = 400;
        respone.message = 'Vui lòng nhập đúng thông tin';
      }
    }
  }
  return respone;
};
