/** @format */

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './UserInformation.module.scss';
import * as UpdateUserInfoApi from '~/services/Account/updateUser';
import * as GetUserApi from '~/services/Account/getUser';
import Button from '~/components/Buttons/Buttons';

const cx = classNames.bind(styles);

function UserInformation({ getUserInformation }) {
  const [information, setInformation] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    image: '',
  });

  //Fetch api & get user information
  const getInformation = async () => {
    if (localStorage.getItem('login')) {
      var user = await GetUserApi.GetUserInformation();

      if (user !== undefined) {
        setInformation(user);
      } else {
        localStorage.removeItem('login');
      }
    }
  };

  const handleSubmit = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Bạn có chắc muốn thay đổi thông tin tài khoản') === true) {
      const response = await UpdateUserInfoApi.UpdateUser(information);
      if (response.status === 202) {
        await getUserInformation();
      } else {
        alert('Cập nhật thất bại thử lại sau');
      }
    }
    return;
  };
  useEffect(() => {
    getInformation();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('header')}>Thông tin tài khoản</h1>
      <ul className={cx('content')}>
        <li className={cx('info-line')}>
          <label className={cx('info-label')}>Tên đầy đủ</label>
          <input
            spellCheck={false}
            className={cx('info-input')}
            value={information.fullName}
            onChange={(e) =>
              setInformation((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />
        </li>
        <li className={cx('info-line')}>
          <label className={cx('info-label')}>Số điện thoại</label>
          <input
            spellCheck={false}
            className={cx('info-input')}
            value={information.phoneNumber}
            onChange={(e) =>
              setInformation((prev) => ({
                ...prev,
                phoneNumber: e.target.value,
              }))
            }
          />
        </li>
        <li className={cx('info-line')}>
          <label className={cx('info-label')}>Email</label>
          <input
            spellCheck={false}
            className={cx('info-input')}
            value={information.email}
            onChange={(e) =>
              setInformation((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </li>
        <li className={cx('info-line')}>
          <label className={cx('info-label')}>Địa chỉ</label>
          <input
            spellCheck={false}
            className={cx('info-input')}
            value={information.address}
            onChange={(e) =>
              setInformation((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </li>
        <li className={cx('info-line')}>
          <label className={cx('info-label')}>Ảnh đại diện</label>
          <input
            spellCheck={false}
            className={cx('info-input')}
            value={information.image}
            placeholder="Nhập link ảnh"
            onChange={(e) =>
              setInformation((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </li>
        <Button className={cx('submit-btn')} primary onClick={handleSubmit}>
          Cập nhật thông tin
        </Button>
      </ul>
    </div>
  );
}

export default UserInformation;
