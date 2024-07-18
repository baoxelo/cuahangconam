/** @format */

import * as request from '~/ultil/httpRequest';

export const CompleteInvoice = async (id) => {
  try {
    const res = await request.authGet(`Admin/CompleteInvoice/${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
