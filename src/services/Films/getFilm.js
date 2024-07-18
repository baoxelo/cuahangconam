/** @format */

import * as request from '~/ultil/httpRequest';

export const getFilmId = async (id) => {
  try {
    const res = await request.get(`Film/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
