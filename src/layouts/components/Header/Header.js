/** @format */
import { useEffect, useState } from 'react';
import { faCaretDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import Search from '~/components/Search';
import Button from '~/components/Buttons';
import config from '~/configs';
import { Link } from 'react-router-dom';
import Modal from '~/components/Modal';
import SignInModal from '~/components/RegistraionModals/SignInModal';
import SignUpModal from '~/components/RegistraionModals/SignUpModal';

const cx = classNames.bind(styles);

function Header({ userInformation, handleLogin }) {
  const [isModel, setIsModel] = useState(false);
  const [loginMethod, setLoginMethod] = useState(false);
  const hideModel = () => {
    setIsModel(false);
  };
  const showRegistry = () => {
    setLoginMethod(true);
  };
  const handleShowLogin = () => {
    setIsModel(true);
  };

  useEffect(() => {}, []);
  return (
    <header className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('logo-wrapper')}>
          <Link to={config.routes.home} className={cx('logo-link')}>
            <img
              src="https://vanphongxanh.vn/wp-content/uploads/2022/03/logo-social.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className={cx('search-wrapper')}>
          <Search />
        </div>

        <div className={cx('user-wrapper')}>
          <Button
            rightIcon={<FontAwesomeIcon icon={faCartShopping} />}
            outline={true}
            to={config.routes.cart}
          >
            Giỏ hàng
          </Button>

          {userInformation.fullName !== '' ? (
            <Button
              className={cx('user-information')}
              leftIcon={
                <img
                  className={cx('user-avatar')}
                  src={userInformation.image}
                  alt="userimage"
                />
              }
              rightIcon={
                <FontAwesomeIcon
                  icon={faCaretDown}
                  style={{ fontSize: '2rem', marginBottom: 4 }}
                />
              }
            >
              <h3 className={cx('user-name')}>{userInformation.fullName}</h3>
            </Button>
          ) : (
            <>
              <Button onClick={handleShowLogin} outline={true}>
                Đăng nhập
              </Button>
            </>
          )}
        </div>
        {!userInformation.fullName && isModel ? (
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
    </header>
  );
}

export default Header;
