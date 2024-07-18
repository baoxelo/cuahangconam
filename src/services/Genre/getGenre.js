/** @format */

import * as request from '~/ultil/httpRequest';

export const Genre = async (id = '') => {
  try {
    const res = await request.get(`Genre/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
