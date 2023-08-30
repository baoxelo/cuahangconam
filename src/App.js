/** @format */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

import { publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import * as LoginApi from '~/services/login';
import * as GetUserApi from '~/services/user';

function App() {
  const [userInformation, setUserInformation] = useState({
    fullName: '',
    image: '',
  });

  const handleLogin = async (e, emailValue, passwordValue) => {
    e.preventDefault();
    const data = {
      account: emailValue,
      password: passwordValue,
    };
    await LoginApi.Login(data);
    await getUserInformation();
  };

  const getUserInformation = async () => {
    if (localStorage.getItem('token')) {
      var user = await GetUserApi.GetUserInformation();
      console.log(user);
      if (user !== undefined) {
        setUserInformation(user);
      } else {
        localStorage.removeItem('token');
      }
    }
  };

  useEffect(() => {
    getUserInformation();
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout
                    userInformation={userInformation}
                    handleLogin={handleLogin}
                  >
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
