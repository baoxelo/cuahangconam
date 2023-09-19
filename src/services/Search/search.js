/** @format */

import * as request from '~/ultil/httpRequest';

export const Search = async (data) => {
  try {
    const res = await request.get(`/Product/Search=${data}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
