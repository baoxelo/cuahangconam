/** @format */
import { useEffect, useState } from 'react';
import {
  faCaretDown,
  faCartShopping,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
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
import * as GetCartApi from '~/services/Cart/getCart';
const cx = classNames.bind(styles);

function Header({ userInformation, handleShowModal, onLogout }) {
  const [cart, setCart] = useState([]);
  const [visibleCart, setVisibleCart] = useState(false);

  const checkRoles = () => {
    if (userInformation.roles !== undefined) {
      return userInformation.roles.includes('administrator');
    }
    return false;
  };
  //Fetch Api for cart
  const fetchCart = async () => {
    console.log(123);
    const response = await GetCartApi.GetCart();
    if (response) {
      setCart(await GetCartApi.GetCart());
      setVisibleCart(true);
    } else {
      setVisibleCart(false);
    }
  };
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
          {checkRoles() ? (
            <Button
              rightIcon={<FontAwesomeIcon icon={faScrewdriverWrench} />}
              outline={true}
              to={config.routes.store}
            >
              Admin
            </Button>
          ) : (
            <Tippy
              interactive
              onShow={() => fetchCart()}
              delay={[0, 500]}
              placement="bottom"
              appendTo={document.body}
              render={(attrs) => {
                if (visibleCart) {
                  return (
                    <div attrs={attrs} className={cx('cart-wrapper')}>
                      <div className={cx('cart-container')}>
                        {cart.map((item, index) => (
                          <div key={index} className={cx('cart-item-wrapper')}>
                            <img
                              className={cx('cart-item-image')}
                              src={item.image}
                              alt="filmimage"
                            />
                            <div className={cx('cart-item-info')}>
                              <h4 className={cx('cart-item-title')}>
                                {item.name}
                              </h4>
                              <div className={cx('cart-item-content')}>
                                <h4 className={cx('cart-item-quantity')}>
                                  Số lượng : {item.quantity} lạng
                                </h4>
                                <h4 className={cx('cart-item-price')}>
                                  Giá: {item.price} đ
                                </h4>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
              }}
            >
              <Button
                to={
                  localStorage.getItem('login') &&
                  config.routes.profile + '=cart'
                }
                className={cx('cart-btn')}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </Button>
            </Tippy>
          )}

          {userInformation.fullName !== undefined ? (
            <Tippy
              interactive
              placement="bottom"
              delay={[0, 700]}
              offset={[12, 8]}
              render={(attrs) => <Menu attrs={attrs} onLogout={onLogout} />}
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
                    style={{ fontSize: '2rem', marginBottom: 4, color: '#ddd' }}
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
