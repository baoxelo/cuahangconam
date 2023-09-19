/** @format */

import * as request from '~/ultil/httpRequest';

export const ActiveUser = async (email) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  try {
    const res = await request.authPut(
      `AdminAccount/UnbanUser/${email}`,
      {},
      config
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
