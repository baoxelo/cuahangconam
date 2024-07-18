/** @format */

import * as request from '~/ultil/httpRequest';

export const ActiveUser = async (email) => {
  try {
    const res = await request.authPut(`Admin/UnbanUser/${email}`, {});

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
