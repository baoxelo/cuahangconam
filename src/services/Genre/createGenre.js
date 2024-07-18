/** @format */

import * as request from '~/ultil/httpRequest';

export const createGenre = async (data) => {
  try {
    const res = await request.authPost(`Genre/CreateGenre`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
