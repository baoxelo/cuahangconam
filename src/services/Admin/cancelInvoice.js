/** @format */

import * as request from '~/ultil/httpRequest';

export const CancelInvoice = async (id) => {
  try {
    const res = await request.authGet(`Admin/CancelInvoice/${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
