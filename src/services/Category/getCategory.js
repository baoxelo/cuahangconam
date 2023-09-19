/** @format */

import * as request from '~/ultil/httpRequest';

export const Category = async (id = '') => {
  try {
    const res = await request.get(`Category/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
