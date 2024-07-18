/** @format */

import * as request from '~/ultil/httpRequest';
export const Logout = async () => {
  try {
    const res = await request.authGet(`Account/logout`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    if (error.response.data.message) {
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};
