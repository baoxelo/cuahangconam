/** @format */
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import * as GetUserApi from '~/services/Account/getUser';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faFileInvoiceDollar,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import UserInformation from './components/UserInformation';
import Invoice from './components/Invoice';
import Cart from './components/Cart';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
  const query = useParams();
  const page = query.page.slice(6);
  const [userInformation, setUserInformation] = useState({});
  const [sidebar, setSidebar] = useState(page);
  const getUserInformation = async () => {
    if (localStorage.getItem('login')) {
      var user = await GetUserApi.GetUserInformation();

      if (user !== undefined) {
        setUserInformation(user);
      } else {
        localStorage.removeItem('login');
      }
    }
  };
  const handleContent = () => {
    switch (sidebar) {
      case 'user': {
        return <UserInformation getUserInformation={getUserInformation} />;
      }
      case 'invoice': {
        return <Invoice />;
      }
      case 'cart': {
        return <Cart userInformation={userInformation} />;
      }
      default:
        break;
    }
  };
  useEffect(() => {
    getUserInformation();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('sidebar')}>
        <div className={cx('user-avatar')}>
          <img
            className={cx('user-image')}
            src={userInformation.image}
            alt="userimage"
          />
          <h2 className={cx('user-name')}>{userInformation.fullName}</h2>
        </div>
        <div className={cx('action-list')}>
          <div
            className={cx('action-item', { active: sidebar === 'user' })}
            onClick={() => setSidebar('user')}
          >
            <FontAwesomeIcon icon={faUser} className={cx('action-icon')} />
            <h3 className={cx('action-name')}>Thông tin tài khoản</h3>
          </div>
          <div
            className={cx('action-item', { active: sidebar === 'invoice' })}
            onClick={() => setSidebar('invoice')}
          >
            <FontAwesomeIcon
              icon={faFileInvoiceDollar}
              className={cx('action-icon')}
            />
            <h3 className={cx('action-name')}>Quản lí đơn hàng</h3>
          </div>
          <div
            className={cx('action-item', { active: sidebar === 'cart' })}
            onClick={() => setSidebar('cart')}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className={cx('action-icon')}
            />
            <h3 className={cx('action-name')}>Giỏ hàng</h3>
          </div>
          <div className={cx('action-item')}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={cx('action-icon')}
            />
            <h3 className={cx('action-name')}>Đăng xuất</h3>
          </div>
        </div>
      </div>
      <div className={cx('content')}>{handleContent()}</div>
    </div>
  );
}

export default Profile;
