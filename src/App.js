/** @format */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import * as LoginApi from '~/services/Account/login';
import * as LogoutApi from '~/services/Account/logout';
import * as GetUserApi from '~/services/Account/getUser';
import SignUpModal from './components/RegistraionModals/SignUpModal';
import SignInModal from './components/RegistraionModals/SignInModal';
import Modal from './components/Modal';

function App() {
  const [userInformation, setUserInformation] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState(true);

  //Hide the modal
  const hideModal = () => {
    setIsModal(false);
  };

  //Show the modal
  const handleShowModal = () => {
    setIsModal(true);
    setRegistrationMethod(true);
  };

  //Login and set the token
  const handleLogin = async (e, emailValue, passwordValue) => {
    if (e) e.preventDefault();
    const data = {
      account: emailValue,
      password: passwordValue,
    };
    const response = await LoginApi.Login(data);
    if (response) {
      localStorage.setItem('login', 'islogin');
      setIsModal(false);
      await getUserInformation();
    }
  };

  //Logout and remove token
  const onLogout = async () => {
    await LogoutApi.Logout();
    localStorage.removeItem('login');
    setUserInformation({});
  };

  //Get user information for header bar
  const getUserInformation = async () => {
    var response = await GetUserApi.GetUserInformation();
    if (response) {
      setUserInformation(response);
    } else {
      await onLogout();
    }
  };

  //Check role to create private routes
  const checkRoles = () => {
    if (userInformation.roles !== undefined) {
      return userInformation.roles.includes('administrator');
    }
    return false;
  };

  useEffect(() => {
    if (localStorage.getItem('login')) {
      console.log(localStorage.getItem('login').toString);
      getUserInformation();
    }
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
                      <Page onLogout={onLogout} />
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
