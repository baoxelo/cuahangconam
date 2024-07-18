/** @format */

import * as request from '~/ultil/httpRequest';

export const Film = async () => {
  try {
    const res = await request.get(`Film`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
