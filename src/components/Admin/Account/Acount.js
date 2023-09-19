/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Account.module.scss';
import * as GetAllUserApi from '~/services/Admin/getAllUsers';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function Account() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setUsers(await GetAllUserApi.GetAllUsers());
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h3 className={cx('title')}>Email</h3>
        <h3 className={cx('title')}>Tên người dùng</h3>
        <h3 className={cx('title')}>Số điện thoại</h3>
        <h3 className={cx('title')}>Địa chỉ</h3>
        <h3 className={cx('title')}>Trạng thái</h3>
      </div>
      <div className={cx('user-list')}>
        {users !== undefined &&
          users.map((item, index) => <AccountItem key={index} data={item} />)}
      </div>
    </div>
  );
}

export default Account;
