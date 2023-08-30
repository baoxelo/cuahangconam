/** @format */

import * as request from '~/ultil/httpRequest';

export const GetUserInformation = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    const res = await request.authGet(`Account/UserInformation`, config);

    return res.data;
  } catch (error) {
    console.log('error');
  }
};
