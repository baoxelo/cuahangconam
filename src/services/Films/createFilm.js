/** @format */

import * as request from '~/ultil/httpRequest';

export const CreateFilm = async (data) => {
  var respone = { status: 500, message: '' };
  try {
    const res = await request.authPost(`Film/CreateFilm/`, data);
    respone.status = res.status;
    respone.message = 'Tạo sản phẩm thành công';
  } catch (error) {
    if (error.status === 500) {
      respone.message = 'Server run into error, please try later !';
      respone.status = 500;
    } else {
      if (error.status === 400) {
        respone.status = 400;
        respone.message = 'Vui lòng nhập đúng thông tin';
      } else {
        respone.message = 'Lỗi máy chủ';
      }
    }
  }
  return respone;
};
