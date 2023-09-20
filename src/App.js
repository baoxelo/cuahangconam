/** @format */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import * as LoginApi from '~/services/Account/login';
import * as GetUserApi from '~/services/Account/getUser';
import SignUpModal from './components/RegistraionModals/SignUpModal';
import SignInModal from './components/RegistraionModals/SignInModal';
import Modal from './components/Modal';
import axios from 'axios';

function App() {
  const [userInformation, setUserInformation] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState(true);
  const [cookie, setCookie] = useCookies();

  //Hide the modal
  const hideModal = () => {
    setIsModal(false);
  };

  //Show the modal
  const handleShowModal = () => {
    setIsModal(true);
    setRegistrationMethod(true);
  };

  //Check role to create private routes
  const checkRoles = () => {
    if (userInformation.roles !== undefined) {
      return userInformation.roles.includes('administrator');
    }
    return false;
  };

  //Login and set the token
  const handleLogin = async (e, emailValue, passwordValue) => {
    if (e) e.preventDefault();
    const data = {
      account: emailValue,
      password: passwordValue,
    };
    await LoginApi.Login(data);
    console.log(cookie);
    if (localStorage.getItem('token')) setIsModal(false);
  };

  //Logout and remove token
  const onLogout = () => {
    localStorage.removeItem('token');
    setUserInformation({
      fullName: '',
      image: '',
      roles: [],
    });
  };

  //Get user information for header bar
  const getUserInformation = async () => {
    var response = await axios.get(
      'https://localhost:7153/api/Account/UserInformation',
      { withCredentials: true }
    );
    console.log(response);
  };

  useEffect(() => {}, []);

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
                    handleShowModal={handleShowModal}
                    onLogout={onLogout}
                  >
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {/* private route */}
          {checkRoles() &&
            privateRoutes.map((route, index) => {
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
                      handleShowModal={handleShowModal}
                      onLogout={onLogout}
                    >
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
        </Routes>
        {userInformation.full === undefined && isModal ? (
          <Modal hideModal={hideModal}>
            {' '}
            {registrationMethod ? (
              <SignInModal
                hideModal={hideModal}
                showRegistry={() => setRegistrationMethod(false)}
                handleLogin={handleLogin}
              />
            ) : (
              <SignUpModal
                hideModal={hideModal}
                showLogin={() => setRegistrationMethod(true)}
              />
            )}
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </Router>
  );
}

export default App;
