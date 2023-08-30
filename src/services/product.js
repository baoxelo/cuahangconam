/** @format */

import * as request from '~/ultil/httpRequest';

export const Product = async () => {
  try {
    const res = await request.get(`Product`);
    return res.data;
  } catch (error) {
    console.log('error');
  }
};
