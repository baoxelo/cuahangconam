/** @format */

import * as request from '~/ultil/httpRequest';

export const GetCart = async () => {
  try {
    const res = await request.authGet(`Cart/GetCart`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
