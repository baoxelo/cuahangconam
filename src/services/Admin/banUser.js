/** @format */

import * as request from '~/ultil/httpRequest';

export const BanUser = async (email) => {
  try {
    const res = await request.authPut(`Admin/BanUser/${email}`, {});

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
