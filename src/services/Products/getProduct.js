/** @format */

import * as request from '~/ultil/httpRequest';

export const getProductId = async (id) => {
  try {
    const res = await request.get(`Product/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
