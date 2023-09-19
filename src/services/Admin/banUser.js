/** @format */

import * as request from '~/ultil/httpRequest';

export const BanUser = async (email) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  try {
    const res = await request.authPut(
      `AdminAccount/BanUser/${email}`,
      {},
      config
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
