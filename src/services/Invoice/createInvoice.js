/** @format */

import * as request from '~/ultil/httpRequest';

export const CreateInvoice = async () => {
  try {
    const res = await request.authGet(`Invoice/CreateInvoice`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
