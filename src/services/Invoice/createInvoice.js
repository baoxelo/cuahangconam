/** @format */

import * as request from '~/ultil/httpRequest';

export const CreateInvoice = async () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  try {
    const res = await request.authGet(`Invoice/CreateInvoice`, config);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
