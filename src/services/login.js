/** @format */

import * as request from '~/ultil/httpRequest';

export const Login = async (loginData) => {
  try {
    const res = await request.post(`Account/login`, loginData);
    if (res.data.token) {
      localStorage.setItem('token', `${res.data.token}`);
      console.log(localStorage.getItem('token'));
    } else {
      return 'invalid';
    }
  } catch (error) {
    console.log('error');
  }
};
