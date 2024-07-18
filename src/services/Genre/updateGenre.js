/** @format */

import * as request from '~/ultil/httpRequest';

export const updateGenre = async (id, data) => {
  try {
    const res = await request.authPut(`Genre/UpdateGenre/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
