/** @format */

import * as request from '~/ultil/httpRequest';
export const Login = async (loginData) => {
  try {
    const res = await request.post(`Account/login`, JSON.stringify(loginData), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    if (res.status === 202) {
      alert('Accept');
    }
  } catch (error) {
    if (error.response.data.message) {
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};
