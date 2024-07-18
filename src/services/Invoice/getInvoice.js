/** @format */

import * as request from '~/ultil/httpRequest';

export const GetInvoice = async () => {
  try {
    const res = await request.authGet(`Invoice/GetInvoices`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
