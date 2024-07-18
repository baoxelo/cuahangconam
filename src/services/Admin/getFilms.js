/** @format */

import * as request from '~/ultil/httpRequest';

export const GetFilmAdmin = async () => {
  try {
    const res = await request.authGet(`Film/Admin`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
