/** @format */

import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faUserTag } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './AccountItem.module.scss';
import * as BanUserApi from '~/services/Admin/banUser';
import * as ActiveUserApi from '~/services/Admin/activeUser';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
  const [user, setUser] = useState(data);

  const handleBanUser = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Cấm tài khoản ${user.email}`) === true) {
      const response = await BanUserApi.BanUser(user.email);
      alert(response.message);
      setUser((prev) => ({ ...prev, status: 'banned' }));
    } else {
      return;
    }
  };
  const handleActiveUser = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Khôi phục tài khoản ${user.email}`) === true) {
      const response = await ActiveUserApi.ActiveUser(user.email);
      alert(response.message);
      setUser((prev) => ({ ...prev, status: 'active' }));
    } else {
      return;
    }
  };
  return (
    <div className={cx('wrapper')}>
      <ul className={cx('account-item')}>
        <li className={cx('account-info')}>
          <h4>{user.email}</h4>
        </li>
        <li className={cx('account-info')}>
          <h4>{user.fullName}</h4>
        </li>
        <li className={cx('account-info')}>
          <h4>{user.phoneNumber}</h4>
        </li>
        <li className={cx('account-info')}>
          <h4>{user.address}</h4>
        </li>
        <li className={cx('account-info')}>
          <h5 className={cx('account-status')}>{user.status}</h5>
          <div className={cx('account-action')}>
            {user.status === 'active' ? (
              <Tippy content="Ban user" placement="bottom">
                <div className={cx('account-icon-wrapper')}>
                  <FontAwesomeIcon
                    icon={faUserSlash}
                    className={cx('account-icon')}
                    onClick={handleBanUser}
                  />
                </div>
              </Tippy>
            ) : (
              <Tippy content="Active" placement="bottom">
                <div className={cx('account-icon-wrapper')}>
                  <FontAwesomeIcon
                    icon={faUserTag}
                    className={cx('account-icon')}
                    onClick={handleActiveUser}
                  />
                </div>
              </Tippy>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AccountItem;
