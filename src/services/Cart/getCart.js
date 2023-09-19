/** @format */

import * as request from '~/ultil/httpRequest';

export const GetCart = async (config) => {
  try {
    const res = await request.authGet(`Cart/GetCart`, config);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
