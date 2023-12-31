/** @format */

import * as request from '~/ultil/httpRequest';

export const GetUserInformation = async () => {
  try {
    const res = await request.authGet(`Account/UserInformation`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
