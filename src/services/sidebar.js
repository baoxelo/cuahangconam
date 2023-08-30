/** @format */

import * as request from '~/ultil/httpRequest';

export const Sidebar = async () => {
  try {
    const res = await request.get(`Category`);
    return res.data;
  } catch (error) {
    console.log('error');
  }
};
