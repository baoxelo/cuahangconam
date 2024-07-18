/** @format */

import * as request from '~/ultil/httpRequest';

export const GetAllUsers = async () => {
  try {
    const res = await request.authGet(`Admin/GetAllUsers`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
