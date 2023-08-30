/** @format */
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './SignInModal.module.scss';
import Button from '../../Buttons/Buttons';
const cx = classNames.bind(styles);

function SignInModal({ showRegistry, handleLogin }) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onChangEmailInput = (e) => {
    const emailValue = e.target.value;
    if (!emailValue.startsWith(' ')) {
      setEmailValue(e.target.value);
    }
  };

  const onChangePasswordInput = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className="wrapper">
      <form className={cx('form-wrapper')}>
        <input
          className={cx('login-input')}
          placeholder="Nhập email"
          value={emailValue}
          onChange={onChangEmailInput}
        />
        <input
          className={cx('login-input')}
          placeholder="Nhập mật khẩu"
          value={passwordValue}
          onChange={onChangePasswordInput}
        />
        <Button
          onClick={(e) => handleLogin(e, emailValue, passwordValue)}
          className={cx('login-btn')}
          primary={true}
        >
          Đăng nhập
        </Button>
      </form>
      <div className={cx('switch-toregistry')}>
        <h3 className={cx('registry-status')}>Bạn mới biết đến Cửa hàng ?</h3>
        <Button onClick={showRegistry} className={cx('registry-link')}>
          Đăng ký
        </Button>
      </div>
    </div>
  );
}

export default SignInModal;
