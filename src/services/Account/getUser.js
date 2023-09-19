/** @format */

import * as request from '~/ultil/httpRequest';

export const GetUserInformation = async () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  try {
    const res = await request.authGet(`Account/UserInformation`, config);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
