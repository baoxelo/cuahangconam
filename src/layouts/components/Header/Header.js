/** @format */
import { useEffect, useState } from 'react';
import { faCaretDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Header.module.scss';
import Search from '~/components/Search';
import Button from '~/components/Buttons';
import config from '~/configs';
import { Link } from 'react-router-dom';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

function Header({ userInformation, handleShowModal, onLogout }) {
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
            <Tippy
              interactive
              delay={[0, 700]}
              offset={[12, 8]}
              render={(attrs) => <Menu attrs={attrs} onLogout={onLogout} />}
              placement="bottom"
              hideOnClick={true}
            >
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
            </Tippy>
          ) : (
            <>
              <Button onClick={handleShowModal} outline={true}>
                Đăng nhập
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
