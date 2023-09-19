/** @format */

import * as request from '~/ultil/httpRequest';
export const Login = async (loginData) => {
  try {
    const res = await request.post(`Account/login`, loginData);
    console.log(res.data);
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    if (error.response.data.message) {
      alert(error.response.data.message);
    } else {
      console.log(error);
    }
  }
};
