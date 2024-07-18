/** @format */

import * as request from '~/ultil/httpRequest';

export const GetInvoice = async () => {
  try {
    const res = await request.authGet(`Admin/GetInvoices`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
