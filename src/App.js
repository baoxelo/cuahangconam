/** @format */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

import { publicRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import * as LoginApi from '~/services/login';
import * as GetUserApi from '~/services/user';
import SignUpModal from './components/RegistraionModals/SignUpModal';
import SignInModal from './components/RegistraionModals/SignInModal';
import Modal from './components/Modal';

function App() {
  const [userInformation, setUserInformation] = useState({
    fullName: '',
    image: '',
  });
  const [isModal, setIsModal] = useState(false);
  const [loginMethod, setLoginMethod] = useState(false);

  const hideModel = () => {
    setIsModal(false);
  };
  const handleShowModal = () => {
    setIsModal(true);
  };
  const showRegistry = () => {
    setLoginMethod(true);
  };

  const handleLogin = async (e, emailValue, passwordValue) => {
    e.preventDefault();
    const data = {
      account: emailValue,
      password: passwordValue,
    };
    await LoginApi.Login(data);
    if (localStorage.getItem('token')) setIsModal(false);
    await getUserInformation();
  };

  const getUserInformation = async () => {
    if (localStorage.getItem('token')) {
      var user = await GetUserApi.GetUserInformation();

      if (user !== undefined) {
        setUserInformation(user);
      } else {
        localStorage.removeItem('token');
      }
    }
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    setUserInformation({
      fullName: '',
      image: '',
    });
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
        {!userInformation.fullName && isModal ? (
          <Modal hideModel={hideModel}>
            {' '}
            {loginMethod ? (
              <SignUpModal />
            ) : (
              <SignInModal
                hideModel={hideModel}
                showRegistry={showRegistry}
                handleLogin={handleLogin}
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
