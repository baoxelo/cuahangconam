/** @format */

import * as request from '~/ultil/httpRequest';

export const GetAllUsers = async () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  try {
    const res = await request.authGet(`AdminAccount/GetAllUsers`, config);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
